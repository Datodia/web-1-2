#!/usr/bin/env node

// import { Command } from 'commander'
// import { readFile } from './utils'
const { Command } =  require('commander')
const { readFile } = require('./utils')

const program = new Command()

program
    .name('test cli with commander')
    .description('test')
    .version('1.0.0')

program
    .command('sayHi')
    .action(() => {
        console.log('hello')
    })

program
    .command('add')
    .argument('<num1>', 'number 1')
    .argument('<num2>', 'number 2')
    .action((num1, num2) => {
        console.log(Number(num1) + Number(num2))
    })


program
    .command('echo')
    .argument('<text>', 'argument')
    .option('-u, --uppercase', 'make this text upperxase')
    .action((text, opts) => {
        if (opts.uppercase) {
            console.log(text.toUpperCase())
            return
        }
        console.log(text)
    })

program
    .command('sayHello')
    .option('-n, --name <name>', 'this is name', 'world')
    .action((opts) => {
        console.log(`hello ${opts.name}`)
    })

program
    .command('show')
    .argument('<name>')
    .action( async (name) => {
        const data = await readFile(`${name}.json`, true)
        console.log(data)
    })

program.parse()