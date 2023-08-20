require('./config/connect')
const express = require('express')
const app = express()
const cors=require('cors')
const multer  = require('multer')
const path=require('path')
const port = 3500

// Socket IO
const http = require('http').Server(app);
// End Socket
app.use(express.static(path.join(__dirname,'statics/uploads')))
app.use(cors());
app.use(express.urlencoded({extended:true})); 

app.use(express.json());
////////post form of nurse
const nurseRoute=require('./Routers/nurseRoute');
app.use('/nurse',nurseRoute);

////////post form of contact us
const patientRoute=require('./Routers/patientRoute');
app.use('/patient',patientRoute);

//////// device
const deviceRoute=require('./Routers/deviceRoute');
app.use('/device',deviceRoute);

// Admin
const adminRoute=require('./Routers/adminRoute');
app.use('/admin',adminRoute);


//////// Post
const postRoute=require('./Routers/postsRoute');
app.use('/post',postRoute);


//////// booking
const bookRoute=require('./Routers/bookingRoute');
app.use('/book',bookRoute);

//////// orders
const orderRoute=require('./Routers/orderRoute');
// const { log } = require('console')
app.use('/order',orderRoute);

// notification POST
const notificationPostRoute=require('./Routers/notificationPostRoute');
app.use('/notificationPost',notificationPostRoute);

app.get('/', (req, res) => res.send('Hello User!'))
// app.listen(port, () => console.log(`app listening on port ${port}!`))


const Notification = require('./Models/NotificationPost');
// Socket IO
const io = require("socket.io")(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    }
})
// End Socket IO


// io.on("connection", (socket) => {
// socket.on("sendNotificationComment", async ({ postNameSender, patientId, postNurseName, nurseComment, postTitle, nurseImg }) => {
//     io.emit("getNotification", {
//       postNameSender,
//       patientId,
//       postNurseName,
//       nurseComment,
//       postTitle,
//       nurseImg
//     });
// });

// // now we need to make the chat 

// socket.on("join_room", (data) => {
//   // console.log(data);
//   // socket.join(data);
//   // console.log(`User with ID: ${socket.id} joined room: ${data}`);
// });

// socket.on("send_message", (data) => {
//   socket.to(data.room).emit("receive_message", data);
// });
// socket.on("sendNotificationChat", async ({ username, userId}) => {
//     io.emit("getNotificationChat", {
//       username,
//       userId
//     });

// });
//   socket.on("disconnect", () => {
//     // Handle socket disconnect
//   });
// })

// this to save in database 
// const Notification = require('./Models/notificationPatient');
// const { findById } = require('./Models/posts')
// const { Socket } = require('socket.io')

//////////////////////
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


//   ///////notification for nurse ask

//   socket.on("sendNotificationBookNurse", async ({ patientName, NurseId, status,times,bookId}) => {
//     try {
//       // console.log("bookId...",bookId);
//       // Create a new notification and save it to the database
//       const newNotification = await Notification.create({
//         patientName,
//         NurseId,
//         status,
//         times,
//         bookId,
//       });

//       // Emit the new notification via Socket.IO
//       io.emit("getNotificationBookNurse", newNotification);

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
// app.use("/NotifPost", async (req, res) => {
//   try {
//     // console.log("enter POST request");
//     const { postNameSender, patientId, postNurseName, nurseComment, postTitle, nurseImg, commentId } = req.body;

//     // Create a new notification and save it to the database
//     const newNotification = await Notification.create({
//       postNameSender,
//       patientId,
//       postNurseName,
//       nurseComment,
//       postTitle,
//       nurseImg,
//       commentId
//     });

//     // Emit the new notification via Socket.IO
//     io.emit("getNotification", newNotification);

//     res.status(200).json({
//       message: "Notification created successfully",
//       data: newNotification,
//       success: true
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: "An error occurred while creating the notification",
//       success: false
//     });
//   }
// });


// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });



///////////////////
io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    // console.log("join_room....",data);
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  // socket.on("sendNotificationComment", async ({ postNameSender, patientId, postNurseName, nurseComment, postTitle, nurseImg, commentId }) => {
  //   try {
  //     // Create a new notification and save it to the database
  //     const newNotification = await Notification.create({
  //       postNameSender,
  //       patientId,
  //       postNurseName,
  //       nurseComment,
  //       postTitle,
  //       nurseImg,
  //       commentId
  //     });

  //     // Emit the new notification via Socket.IO
  //     io.emit("getNotification", newNotification);

  //     // Send a response to the client
  //     socket.emit("notificationSent", {
  //       message: "Notification created successfully",
  //       data: newNotification,
  //       success: true
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     socket.emit("notificationError", {
  //       message: "An error occurred while creating the notification",
  //       success: false
  //     });
  //   }
  // });

  socket.on("sendNotificationBookNurse", async ({ patientName, NurseId, status,times,bookId}) => {
    try {
      // console.log("bookId...",bookId);
      // Create a new notification and save it to the database
      const newNotification = await Notification.create({
        patientName,
        NurseId,
        status,
        times,
        bookId,
      });

      // Emit the new notification via Socket.IO
      io.emit("getNotificationBookNurse", newNotification);

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
    console.log("User Disconnected", socket.id);
  });
});


///////////////////////

app.use("/NotifPost", async (req, res) => {
  try {
    // console.log("enter POST request");
    const { postId, postNameSender, patientId, postNurseName, nurseComment, postTitle, nurseImg, commentId } = req.body;

    // Create a new notification and save it to the database
    const newNotification = await Notification.create({
      postId,
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

//////////////////








//////////////////////////

// Socket IO
http.listen(port, () => {
    console.log(`App listening at ${port}`);
});
// End Socket IO


///////////////////////////send Email using nodemailer////////////////
////////////////////////////contact us///////

// const nodemailer=require('nodemailer');
// const CLIENT_ID = '73789796227-8nvsv8cgoal3k4138r6cn3inai4t9f86.apps.googleusercontent.com';
// const CLIENT_SECRET = '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';

// // USE fun to send email
// async function sendEmail() {
//     try {
//         const transport=nodemailer.createTransport({
//             service:'gmail',
//             auth:{
//                 type:'OAuth2',
//                 user:'',
//                 clientId:CLIENT_ID,
//                 clientSecret:CLIENT_SECRET,
//                 accessToken:"ya29.a0AWY7CkkKUR03q5gzZTAExInckHYWZmH_WsbhCMVYSxP43bnQ6I7E4BLQDdEDqoJNcXM-Jg78I0mDgWDNCUxAaCo0pv1H_Q6aC5CF5ougqJ_Sc3bYOd84nA1Ue3aePQ8ajYAI2d5Dqts9EFZhzNposLGZLZe-E80aCgYKAdoSARMSFQG1tDrpt8r5yZInXYZzHD1S6cfhrA0166"
//             },
//         });
//         const mailOptions = {
//             from:'',
//             to:'hanymah823@gmail.com',
//             subject:'Contact Us',
//             text:'This is a test email',
//             html:'<h1>This is a test email Hany</h1>'
//         }
//         const result=await transport.sendMail(mailOptions)
//         return result;
//     }catch(err) {
// console.log(err);
// // return err;
//     }
// }

// sendEmail().then((result) => {
//     console.log("email is sent" + result);
// }).catch((error) => {
//     console.log("error is "+ error);
// });

////////////////////////////contact us///////

/////////////////////////////////////////////////////////////