const express = require('express');
const ObjectId=require('mongoose').Types.ObjectId
const BookingNurse = require('../Models/booking')
const ContactUs = require('../Models/contact')
const Patient = require('../Models/patient')
const nurse = require('../Models/nurse');
const Device = require('../Models/devices')
const PatientPost = require('../Models/posts')
const Rate = require('../Models/rate')

const route = express.Router();
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
route.use(cookieParser())
route.use(bodyParser.json())
const { verify } = require('crypto');
// const { error, log } = require('console');
route.use(bodyParser.urlencoded({ extended: true }))
/////////////////////////////////
// this to understand file
const fs = require("fs");
const bcrypt = require("bcryptjs");
// let secret = fs.readFileSync("secret.key");
// const { verifyToken } = require("../shared/auth");


const key = "keystring";
/////////////////////////////////

const filestorage = multer.diskStorage({
  destination: (req, file, callbackfun) => {
    // console.log(req,file);
    callbackfun(null, './statics/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replaceAll(" ", ''))
  }
})
const upload = multer({ storage: filestorage });
const Notification = require('../Models/NotificationPost');

// const { io } = require('../index');
////////////////////////////////////////////////////////////////////////////////////////
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


///////////////////////////////////////////////////////////////////

///
const app = express()
const http = require('http').Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST","PUT"],
  }
})

// POST a new notification

// route.post('/NotifPost', async (req, res) => {
//     try {
//       const { postNameSender, patientId, postNurseName, nurseComment, postTitle, nurseImg, commentId } = req.body;
        
//       // Create a new notification and save it to the database
//       const newNotification = await Notification.create({
//         postNameSender,
//         patientId,
//         postNurseName,
//         nurseComment,
//         postTitle,
//         nurseImg,
//         commentId
//       });
  
//       // Emit the new notification via Socket.IO
//       io.emit('newNotification', newNotification);
  
//       res.status(201).json({
//         message: 'Notification created successfully',
//         data: newNotification,
//         success: true
//       });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({
//         message: 'An error occurred while creating the notification',
//         success: false
//       });
//     }
//   });


// io.on("connection", (socket) => {
//   socket.on("sendNotificationComment", async ({ postNameSender, patientId, postNurseName, nurseComment, postTitle, nurseImg, commentId }) => {
//     try {
//       // Create a new notification and save it to the database
//       const newNotification = await Notification.create({
//         postNameSender,
//         patientId,
//         postNurseName,
//         nurseComment,
//         postTitle,
//         nurseImg,
//         commentId
//       });
  
//       // Emit the new notification via Socket.IO
//       io.emit("getNotification", newNotification);
  
//       // Send a response to the client
//       socket.emit("notificationSent", {
//         message: "Notification created successfully",
//         data: newNotification,
//         success: true
//       });
//     } catch (err) {
//       console.error(err);
//       socket.emit("notificationError", {
//         message: "An error occurred while creating the notification",
//         success: false
//       });
//     }
//   });
  
//   socket.on("disconnect", () => {
//     console.log("Socket is disconnected");
//   });
// });

// // Define the route to handle the POST request
// route.post("/NotifPost", async (req, res) => {
//   try {
//     // console.log("it is not in the route of notificationpost");
//     console.log(req.body);
    
//     const { postNameSender, patientId, postNurseName, nurseComment, postTitle, nurseImg, commentId } = req.body;
        
//     // Emit the request to the Socket.IO connection
//     io.emit("sendNotificationComment", {
//       postNameSender,
//       patientId,
//       postNurseName,
//       nurseComment,
//       postTitle,
//       nurseImg,
//       commentId
//     });
  
//     res.status(200).json({
//       message: "Notification request sent successfully",
//       success: true
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: "An error occurred while sending the notification request",
//       success: false
//     });
//   }
// });

//route to get all notification posts

route.get('/getNotif',verifyToken,async (req,res)=>{
  try{
    let id = req.query.patientId;
    let notifications=await Notification.find({"patientId":id});
    console.log("id",id);
    console.log("notifications....",notifications);

    res.json({
      message: "Patient notifications retrieved successfully!",
      status: 200,
      data: notifications,
      success: true,
    });
  } catch (err) {
    res.json({
      message: "Error: " + err,
      status: 500,
      data: null,
      success: false,
    });

  }
})


//////////
io.on("connection", (socket) => {
  socket.on("sendNotificationComment", async ({ postNameSender, patientId, postNurseName, nurseComment, postTitle, nurseImg, commentId }) => {
    try {
      // Create a new notification and save it to the database
      const newNotification = await Notification.create({
        postNameSender,
        patientId,
        postNurseName,
        nurseComment,
        postTitle,
        nurseImg,
        commentId
      });

      // Emit the new notification via Socket.IO
      io.emit("getNotification", newNotification);

      // Send a response to the client
      socket.emit("notificationSent", {
        message: "Notification created successfully",
        data: newNotification,
        success: true
      });
    } catch (err) {
      console.error(err);
      socket.emit("notificationError", {
        message: "An error occurred while creating the notification",
        success: false
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket is disconnected");
  });
});

// Define the route to handle the POST request
route.post("/NotifPost", async (req, res) => {
  try {
    // console.log("enter POST request");
    const { postNameSender, patientId, postNurseName, nurseComment, postTitle, nurseImg, commentId } = req.body;

    // Create a new notification and save it to the database
    const newNotification = await Notification.create({
      postNameSender,
      patientId,
      postNurseName,
      nurseComment,
      postTitle,
      nurseImg,
      commentId
    });

    // Emit the new notification via Socket.IO
    io.emit("getNotification", newNotification);

    res.status(200).json({
      message: "Notification created successfully",
      data: newNotification,
      success: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while creating the notification",
      success: false
    });
  }
});





  
  module.exports = route;
 
 
 