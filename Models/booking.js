// const mongoose = require("mongoose");
// const { strict } = require('assert');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const Schema = mongoose;

const nurseSchema = mongoose.Schema({
    userName:{
        type: 'string',
    },
    email:{
        type: 'string',
    },
    userAge:{
        type: 'number',
    },
    userPhoneNumber:{
        type: 'number',
    },
    userAddress:{
        type: 'string',
    },
    userCity:{
        type: 'string',
    },
    patientStatus:{
        type: 'string',
    },
    type_of_services:{
        type: ["string"],
    },
    type:{
        type: 'string',
    },
    // joinedDate: { 
    //     type: Date,
    //     default: Date.now,
    // },
    // startDate: {  
    //     type: Date,
    //  },
    //  endDate: {  
    //     type: Date,
    // },
    // service: {
    //     type: [String],
    // },
    patientId: {
        type:Schema.Types.ObjectId,
        ref: 'Patient'
    },
    NurseId: {
        // type: String,
        type:Schema.Types.ObjectId,
        ref: 'nurse'
    },
    price: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: {
            values: ['pending','accepted','rejected'],
        },
        default: "pending",
    },
    period: {
        day: {
            type: String
        },
        times: {
            type: String
        },
        shift: {
            type: String
        }
    },
}, {
    versionKey: false,
    strict: false,
})


const BookingNurse = mongoose.model('nurses', nurseSchema);
module.exports = BookingNurse;

// module.exports = mongoose.model("users", userSchema);