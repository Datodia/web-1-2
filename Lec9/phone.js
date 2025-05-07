#!/usr/bin/env node

const { Command } =  require('commander')
const { readFile, writeFile } = require('./utils')

const program = new Command()

program
    .name('test cli with commander')
    .description('test')
    .version('1.0.0')


program
    .command('add')
    .argument('<number>', 'number 1')
    .argument('<name>', 'number 2')
    .option('--geo')
    .action(async (number, name, opts) => {
        const contacts = await readFile('phones.json', true)
        const lastId = contacts[contacts.length - 1]?.id || 0
        const newContact = {
            id: lastId+1,
            name,
            number: opts.geo ? `+995${number}` : number
        }
        contacts.push(newContact)
        await writeFile('phones.json', JSON.stringify(contacts))
    })

program
    .command('delete')
    .argument('<id>')
    .action(async (id) => {
        const contacts = await readFile('phones.json', true)
        const index = contacts.findIndex(el => el.id === Number(id)) 
        if(index === -1){
            console.log('cannot delete cocnat')
            return
        }

        const deletedContact = contacts.splice(index, 1)
        await writeFile('phones.json', JSON.stringify(contacts))
        console.log(deletedContact)
    })

program
    .command('show')
    .action( async () => {
        const data = await readFile(`phones.json`, true)
        console.log(data)
    })

program.parse()