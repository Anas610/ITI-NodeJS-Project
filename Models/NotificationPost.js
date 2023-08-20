const mongoose = require('mongoose');
const express = require('express');
const app = express();

const Schema = mongoose;


const notificationPostSchema = mongoose.Schema({
    postNameSender: {
        type: String,
        // required: true
    },
    postNurseName: {
        type: String,
        // required: true
    },
    nurseComment: {
        type: String,
        // required: true
    },
    //   sentToPatient: {
    //     type: Boolean,
    //     default: false
    //   },
    sentAt: {
        type: Date,
        default: Date.now
    },
    patientId: {
        type: String,

    },
    postTitle: {
        type: String,

    },

    commentId: {
        type: String,

    },

    nurseImg: {
        type: String,

    },
}, {
    versionKey: false,
    strict: false,
})




const notificationPost = mongoose.model('notifications', notificationPostSchema);
module.exports = notificationPost;

// module.exports = mongoose.model("users", userSchema);