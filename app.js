const express = require('express');
const Client = require('pulsar-client')
const {createProducer, namespaces} = require('./createProducer')

require('dotenv').config()
const app = express()

const client = new Client.Client({
    serviceUrl: process.env.service_url,
});

let BPO_producer_payment, individual_producer, international_producer, local_producer;

(async () => {
    BPO_producer_payment = await createProducer(namespaces[0], client, 'payment')
})()

app.get('/login', (req, res, next) => {
    BPO_producer_payment.send({data: Buffer.from('Hello')})
    res.status(200).send('logged in!')
})


app.listen(process.env.PORT, console.log(`app listening on port ${process.env.PORT}`))
