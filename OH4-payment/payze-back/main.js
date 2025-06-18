const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(express.json())

app.use(cors())


app.post('/create-payment', async (req, res) => {
    const resp = await fetch(`${process.env.PAYZE_BASE_URL}`, {
        headers: {
            'Content-Type': 'application/json',
            "authorization": `${process.env.PAYZE_API_KEY}:${process.env.PAYZE_API_SECRET}`,
        },
        method: 'PUT',
        body: JSON.stringify({
            source: 'Card',
            amount: req.body.amount,
            currency: 'GEL',
            language: 'KA',
            hooks: {
                webhookGateway: 'https://rlsf57aevx.loclx.io/webhook',
                successRedirectGateway: 'http://localhost:3000?type=success',
                errorRedirectGateway: "http://localhost:3000?type=error"
            }
        })
    })
    const data = await resp.json()

    console.log(data, "dataaaa")
    res.send('success')
})

app.post('/webhook',async (req, res) => {
    console.log(req.body, "req.hodyyy")
    const {PaymentStatus} = req.body
    if(PaymentStatus === 'Captured'){
        console.log("warmatebit gadaixardaaaa")
    }
    if(PaymentStatus === 'Rejected'){
        console.log('ver gadaixadaaaa')
    }
    res.send('ok')
})

app.listen(3001, () => {
    console.log('http://localhost:3001')
})