const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  userAge: {
    type: Number,
  },
  userMobile: {
    type: String,
  },
  Region: {
    type: String,
  },
  Address: {
    type: String,
  },
  gender: {
    type: String,
  },

  numOfDevice: {
    type: Number,
    // required: true,
  },
  startDate: {
    type: Date,
    // required: true,
  },
  endDate: {
    type: Date,
    // required: true,
  },
  products: {
    type: Array
  },
  // patient: {//مستاجر
  //   type: String,
  //   // required: true,
  // },
  // price: {// مبلغ الايجار
  //   type: Number,
  //   // required: true,
  // },
  patientStatus: {
    type: String,
    // enum: ['pending', 'inprogress', 'Expired', 'reached'],
    // default: 'pending',
    enum: ['قيد الإنتظار', 'قيد التقدم', 'مُلغى', 'وصل بنجاح'],
    default: 'قيد التقدم',
  },
  totalPrice: {
    type: Number,
    // required: true,
  }
  
},
  {
    timestamps: true,
    versionKey: false,
    strict: false
  });




const Order = mongoose.model('orders', orderSchema);

module.exports = Order;