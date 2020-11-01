const express = require('express')
const router = express.Router()
const moment = require("moment")
var nodeoutlook = require('nodejs-nodemailer-outlook')
require('dotenv').config()



router.post('/', (req, res) => {

    console.log(req.body.orderNr)
    let orderNr = req.body.orderNr
    
    sendEmailOutlook(orderNr, res)
    
})

function sendEmailOutlook(orderNr, res){
    let date = moment().add(3, 'days').calendar({sameElse: 'DD/MM/YYYY'});
    nodeoutlook.sendEmail({
    auth: {
        user: process.env.EMAILLOGIN,
        pass: process.env.EMAILPASS
    },
    from: process.env.FROM,
    to: process.env.TO,
    subject: 'Order updated!',
    text: 'Your order: ' + orderNr + " has now been sent. Expected time of arrival => " + date,
    replyTo: '',
    attachments: [],
    onError: (e) => {
        console.log(e)
        res.send("ERR")
    },
    onSuccess: (i) => {
        console.log(i)
        res.send("Email sent")
    }
}
 
 
);
}

module.exports = router