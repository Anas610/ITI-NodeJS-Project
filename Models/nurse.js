const mongoose = require("mongoose");

const nurseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: "Email address is required",
    validate: {
      validator: function (val) {
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(val);
      },
      message: "Please fill a valid email address"
    }
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  booking: {
    //     type : Array,
    //     default:[]
    // }
    type: [mongoose.Schema.Types.ObjectId], // store references to Booking model
    ref: "BookingNurse",
    default: [],
  }
  ,
  proposals: {
    type: [mongoose.Schema.Types.ObjectId], // store references to Proposal model
    ref: "Proposal",
    default: [],
  },
  nationalId: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    min: 15,
    max: 70
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: "You entered not valid value"
      // values: ["ذكر", "أُنثي"],
      // message: "لقد أدخلت قيمة غير صالحة",
    }
  },
  region: {
    type: String,
  },
  address: {
    type: String,
  },
  //image
  gradeCert: {
    type: String,
  },
  profile: {
    type: String,
    default: "nurse.png"
  },
  //مزاولة المنهة
  license: {
    type: String,
  },
  role:{
    type:String,
    default: 'nurse'
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  shiftPrice: {
    type: Number,
  },
  Availability: [{
    from: {
      type: String,
    },
    to: {
      type: String,
    }

  }],
  ////// Anas ////////////
  available: [{
    day: {
      type: String
    },
    times: [{
      type: String
    }]
  }],
  ////////////////
  education:[{
    degree: {
      type: String,
      // required: true
    },
    field: {
      type: String,
      // required: true
    },
    school: {
      type: String,
      // required: true
    },
    fromDate: {
      type: Date, // or String, depending on your requirements
      // required: true
    },
    toDate: {
      type: Date, // or String, depending on your requirements
      // required: false
    },
    description: {
      type: String,
      // required: true,
    },
  }],
  experience: [{
    title: {
      type: String,
      // required: true,
    },
    employmentType: {
      type: String,
      // required: true,
    },
    company: {
      type: String,
      // required: true,
    },
    location: {
      type: String,
      // required: true,
    },
    fromDate: {
      type: Date,
      // required: true,
    },
    toDate: {
      type: Date,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
  }],
  TotalBalance: {
    type: Number
    //type:String
  },
  rates:
  {
      type: Number,
      default: 0,
      max: 5,
      min: 0
  },
  experienceYear:{
    type:Number,
  }
 
}, {
  versionKey: false,
  strict: false,
})



const nurse = mongoose.model('nurseprofiels', nurseSchema);
module.exports = nurse;