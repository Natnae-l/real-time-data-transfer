const express = require('express');

require('dotenv').config()
const app = express()


app.listen(3000, console.log(`app listening on port ${process.env.port}`))
