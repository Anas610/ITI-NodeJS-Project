const mongoose = require("mongoose");

const rateSchema = mongoose.Schema({
    rate: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient",
    },
    NurseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "nurse",
    },
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "device",
    },
}, {
    timestamps: true, //add timestamps for createdAt and updatedAt fields
    versionKey: false,
    strict: false,
})
const Rates = mongoose.model("rates", rateSchema)
module.exports = Rates
