const mongoose = require("mongoose");

const patientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // unique: true,
      // required: "Email address is required",
      // validate: {
      //   validator: function (val) {
      //     let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      //     return pattern.test(val);
      //   },
      //   message: "Please fill a valid email address",
      // },
    },
    password: {
      type: String,
      // required: true,
    },
    phoneNumber: {
      type: Number,
      // required: true,
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },

    cart: {
      type: Array,
      default: [],
    },
    // order: { //Checkout (when purchasing)
    //     type: Array,
    //     default: [],
    //   },
    order:
    {
      type: Array,
      default: []
    },
    nationalId: {
      type: Number,
      // required: true,
      // unique: true,
      // min:14,
      // max:14
    },
    age: {
      type: Number,
      min: 0,
      max: 75,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "You entered not valid value",
      },
    },
    profile: {
      type: String,
      default: "patient.png"
    },
    region: {
      type: String,
    },
    address: {
      type: String,
    },
    role:{
      type:String,
      default:"patient"
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    rates: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    // socket
  },
  {
    versionKey: false,
    strict: false,
  }
);
const patient = mongoose.model('patients', patientSchema);
module.exports = patient;
// module.exports = mongoose.model("users", userSchema);
