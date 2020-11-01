const express = require("express")
const app = express()
const email = require('./email.js')
require('dotenv').config()
const port = process.env.PORT || 3005

app.use(express.json())

app.use("/email", email)


app.listen(port, ()=> {

    console.log(`Server running at port:${port}`)

})

