const express=require('express');

const BookingNurse=require('../Models/booking')
const ContactUs=require('../Models/contact')
const Patient=require('../Models/patient')
const nurse =require('../Models/nurse')
const Device=require('../Models/devices')
const PatientPost=require('../Models/posts')
const Rate=require('../Models/rate')
const Order=require('../Models/order')
// const booking=require('../Models/')

const route=express.Router();
const bodyParser=require('body-parser')
const multer  = require('multer')
const path=require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
route.use(cookieParser())
route.use(bodyParser.json())
const { verify }=require('crypto');
const { error } = require('console');
route.use(bodyParser.urlencoded({ extended: true }))

/////////////////////////////////////////
const fs = require("fs");
const bcrypt = require("bcryptjs");
let secret = fs.readFileSync("secret.key");
// const { verifyToken } = require("../shared/auth");


const key="keystring";

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        res.json({
          message: "Error: invalid token",
          status: 401,
          data: null,
          success: false,
        });
      } else {
        req.patient = decoded.patient;
        next();
      }
    });
  } else {
    res.status(403).send("Error: authorization token is empty");
  }
}
/////////////////////////////////////////

route.put('/bookings/:bookingId', async (req, res) => {
    try {
      console.log("enter the route");
      console.log("bookingId...",req.params.bookingId);
      const bookingId = req.params.bookingId;
    //   here you can make form and when click on submit it will change the route to new value
      const newStatus = req.body.status;
      const booking = await BookingNurse.findByIdAndUpdate(
        bookingId ,
        { status:newStatus },
        { new: true }
      );
      
      if(booking){
        const book = await BookingNurse.find({})
        res.json({
          message: 'Booking status updated successfully!',
          status: 200,
          data: book,
          success: true,
        });
      }
      if (!booking) {
        return res.json({
          message: 'Booking not found',
          status: 404,
          data: booking,
          success: false,
        });
      }

    } catch (e) {
      res.json({
        message: 'Error: ' + e,
        status: 401,
        data: null,
        success: false,
      });
    }
  });


  //get all booking
route.get('/bookings', async (req, res) => {
  try {
    const bookings = await BookingNurse.find();
    res.json({
      message: 'All bookings retrieved successfully!',
      status: 200,
      data: bookings,
      success: true,
    });
  } catch (e) {
    res.json({
      message: 'Error: ' + e,
      status: 401,
      data: null,
      success: false,
    });
  }
});


// update status of booking route 
// route.put('/bookings/:bookingId/status', async (req, res) => {
//   try {
//     const bookingId = req.params.bookingId;
//     // here you can make form and when click on submit it will change the route to new value
//     const newStatus = req.body.status;
//     const booking = await BookingNurse.findOneAndUpdate(
//       { 'booking._id': bookingId },
//       { $set: { 'booking.$.status': newStatus } },
//       { new: true }
//     );
//     if (!booking) {
//       return res.json({
//         message: 'Booking not found',
//         status: 404,
//         data: null,
//         success: false,
//       });
//       res.json({
//         message: 'Booking status updated successfully!',
//         status: 200,
//         data: booking,
//         success: true,
//       });
//     }
    // res.json({
    //   message: 'Booking status updated successfully!',
    //   status: 200,
    //   data: booking,
    //   success: true,
    // });
//   } catch (e) {
//     res.json({
//       message: 'Error: ' + e,
//       status: 401,
//       data: null,
//       success: false,
//     });
//   }
// });


// New From Hany (15-6-2023)
route.post('/bookNurse/:nurseId',verifyToken,async function(req,res)
{
  // console.log("it had enter the bookNurse");
  // console.log("patientId: " + req.query.patientId);
  // console.log("NurseId: " + req.params.nurseId);
// console.log(req.body);
    let nursebook= await BookingNurse.create({
      userName:req.body.userName,
      email:req.body.email,
      userAge:req.body.userAge,
      userPhoneNumber:req.body.userPhoneNumber,
      userAddress:req.body.userAddress,
      userCity:req.body.userCity,
      patientStatus:req.body.patientStatus,
      type_of_services:req.body.type_of_services,
      type:req.body.type,
      patientId:req.query.patientId,
      NurseId:req.params.nurseId,
      // status:req.body.status,
      price:50*req.body.type_of_services.length,
      period: req.body.period
    })
    // console.log(nursebook);
    // console.log(nursebook);
    if(nursebook){
        res.json({
          message: "successfully added",
          status: 200,
          data: nursebook,
          success: true,
        });
        // console.log(nurse);
      } else if(e) {
        res.json({
          message: "Error:invalid product ," + e,
          status: 401,
          data: null,
          success: false,
        });
      }
})
// route.post('/bookNurse/:nurseId', verifyToken, async function(req, res) {
//   try {
//     let nursebook = await BookingNurse.create({
//       userName: req.body.userName,
//       email: req.body.email,
//       userAge: req.body.userAge,
//       userPhoneNumber: req.body.userPhoneNumber,
//       userAddress: req.body.userAddress,
//       userCity: req.body.userCity,
//       patientStatus: req.body.patientStatus,
//       type_of_services: req.body.type_of_services,
//       type: req.body.type,
//       patientId: req.query.patientId,
//       NurseId: req.params.nurseId,
//       price: 50 * req.body.type_of_services.length,
//       period: req.body.period
//     });

//     await nursebook.save()
//     if (nursebook) {
//       res.json({
//         message: "Successfully added",
//         status: 200,
//         data: nursebook,
//         success: true,
//       });
//     } else {
//       res.json({
//         message: "Error: Invalid product",
//         status: 401,
//         data: null,
//         success: false,
//       });
//     }
//   } catch (e) {
//     res.json({
//       message: "Error: " + e.message,
//       status: 401,
//       data: null,
//       success: false,
//     });
//   }
// });

// ///////
// route.get('/Nursebooking',verifyToken, async (req, res) => {
//   // route.get('/Nursebooking', async (req, res) => {
//   try {
//     const patientId = req.query.patientId;
//     // const patientId = "6481d90208832487bd9fcde8";
//     const bookings = await BookingNurse.find({ patientId: patientId })
//       .populate({ path: 'NurseId', model: 'nurseprofiels', select: 'name profile' });
//     const nurses = bookings.map(booking => {
//       const nurse = booking.NurseId.toObject();
//       //  nurse.NurseId = booking._id;
//       // console.log(nurse);
//       // nurse.name = nurse.userName; // add a "name" field to the nurse object
//       // delete nurse.userName; // remove the "userName" field
//       return nurse;
//     });

//     res.json({
//       message: 'Success',
//       status: 200,
//       data: nurses,
//       success: true,
//     });
//   } catch (e) {
//     res.json({
//       message: 'Error: ' + e,
//       status: 401,
//       data: null,
//       success: false,
//     });
//   }
// });

// route.get('/Nursebooking', verifyToken, async (req, res) => {
//   try {
//     const patientId = req.query.patientId;
//     const bookings = await BookingNurse.find({ patientId: patientId })
//       .populate({ path: 'NurseId', model: 'nurseprofiels', select: 'name profile' });
//     const nurses = bookings.map(booking => {
//       const nurse = booking.NurseId.toObject();
//       return {
//         profile: nurse.profile,
//         name: nurse.name,
//         status: booking.status,
//       };
//     });

//     res.json({
//       message: 'Success',
//       status: 200,
//       data: nurses,
//       success: true,
//     });
//   } catch (e) {
//     res.json({
//       message: 'Error: ' + e,
//       status: 401,
//       data: null,
//       success: false,
//     });
//   }
// });
// route.get('/Nursebooking', verifyToken, async (req, res) => {
//   // route.get('/Nursebooking', async (req, res) => {
//   try {
//     const patientId = req.query.patientId;
//     // const patientId = "6495b887de5f0a3a2e5bacb2";
//     const bookings = await BookingNurse.find({ patientId: patientId })
//       .populate({ path: 'NurseId', model: 'nurseprofiels', select: 'name profile' });
//     const nurses = bookings.map(booking => {
//       const nurse = booking.NurseId.toObject();
//       return {
//         profile: nurse.profile,
//         name: nurse.name,
//         _id: nurse._id,
//         status: booking.status,
//       };
//     });

//     res.json({
//       message: 'Success',
//       status: 200,
//       data: nurses,
//       success: true,
//     });
//   } catch (e) {
//     res.json({
//       message: 'Error: ' + e,
//       status: 401,
//       data: null,
//       success: false,
//     });
//   }
// });

// NurseBooking Native From Hany
route.get('/NursebookingNative', verifyToken, async (req, res) => {
  try {
    console.log(req.query.patientId)
    const patientId = req.query.patientId;
    // const patientId = "649080bbae938dbdfb646421";
    const bookings = await BookingNurse.find({ patientId: patientId })
      .populate({ path: 'NurseId', model: 'nurseprofiels', select: 'name profile' });
    const nurses = bookings.map(booking => {
      const nurse = booking.NurseId;
      if (nurse) {
        return {
          profile: nurse.profile,
          name: nurse.name,
          _id: nurse._id,
          status: booking.status,
        };
      } else {
        return null;
      }
    }).filter(nurse => nurse !== null);

    res.json({
      message: 'Success',
      status: 200,
      data: nurses,
      success: true,
    });
  } catch (e) {
    res.json({
      message: 'Error: ' + e,
      status: 401,
      data: null,
      success: false,
    });
  }
});


  module.exports = route