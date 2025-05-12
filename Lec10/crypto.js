#!/usr/bin/env node


import { Command } from 'commander'

const program = new Command()

const coinMapper = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    XRP: 'XRP',
    SOL: "solana",
    DOGE: "dogecoin"
}

program
    .command('price')
    .argument('<coin>')
    .action(async (coin) => {
        const mappedCoin = coinMapper[coin] || coin
        const resp = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${mappedCoin}&vs_currencies=usd`)
        const data = await resp.json()

        console.log(`${mappedCoin} Price is ${data[mappedCoin]?.usd}`)
    })


program
    .command('convert')
    .argument('<amount>')
    .argument('<from>')
    .argument('<to>')
    .action(async (amount, from, to) => {
        const resp = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&access_key=03b4c477902e9d6cb0f92b13b6b84a53`)
        const data = await resp.json()

        console.log(`${amount} from ${from} to ${to} is ${data.result}`)
    })
program.parse()