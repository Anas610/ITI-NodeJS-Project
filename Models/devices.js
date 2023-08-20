const mongoose = require("mongoose");

const deviceScema = mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    price: {
        type: Number,
        // required: true
    },
    details: {
        type: String,
        // required: true,
    },
    joinedDate: { //Device Life Time
        type: Date,
        default: Date.now,
    },
    quantity: {
        type: String,
    },

    category: {
        type: String,
    },

    image: {
        type: [String],
        default: [""]
    },
    status: {
        type: String,
        default: "available",
        enum: {
            values: ['available', 'out of order'],
        }
    },
    rate:
    {
        type: Number,
        default: 0,
        max: 5,
        min: 0
    },
    quantitycart:{
        type: Number,
        // default:1
        
    },
    totalPrice: {
        type: Number,
        // default:0,
        
    }
}, {
    versionKey: false,
    strict: false,
})

const device = mongoose.model("devices", deviceScema)
module.exports = device