const express = require('express');
const Client = require('pulsar-client')

require('dotenv').config()
const app = express()

const client = new Client.Client({
    serviceUrl: process.env.service_url,
});


app.post('login', (req, res, next) => {
    res.status(200).send('logged in!')
})


app.listen(process.env.PORT, console.log(`app listening on port ${process.env.PORT}`))
