const mongoose = require('mongoose');
const express = require('express');
const app = express();

const Schema = mongoose;

const contactUsSchema = mongoose.Schema({
    name: {
        type: String,
        // required:true
    },
    email: {
        type: String,
        // required:true
    },
    message: {
        type: String,
        // required:true
    }
}, {
    versionKey: false,
    strict: false,
})

const ContactUs = mongoose.model('contactus', contactUsSchema);
module.exports = ContactUs;


