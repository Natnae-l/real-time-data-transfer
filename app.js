const express = require('express');
const Client = require('pulsar-client')
const {createProducer, namespaces} = require('./createProducer')

require('dotenv').config()
const app = express()

app.use(express.urlencoded({extended: false}))

const client = new Client.Client({
    serviceUrl: process.env.service_url,
});

let BPO_producer_job, individual_producer_job, international_producer_job, local_producer_job;

(async () => {
    // job topic producer for all namespaces
    BPO_producer_job = await createProducer(namespaces[0], client, 'job')
    individual_producer_job = await createProducer(namespaces[1], client, 'job')
    international_producer_job = await createProducer(namespaces[2], client, 'job')
    local_producer_job = await createProducer(namespaces[3], client, 'job')
})()


app.post('/job', (req, res, next) => {

    BPO_producer_job.send({
        properties: {
            key: JSON.stringify({
                job_title: req.body.title,
                employment_type: req.body.type,
                party_type: req.body.party_type
            })
        },
        data: Buffer.from(req.body.description)
})

    res.status(200).send('logged in!')
})


app.listen(process.env.PORT, console.log(`app listening on port ${process.env.PORT}`))
