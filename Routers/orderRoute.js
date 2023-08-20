// const express=require('express');

// const BookingNurse=require('../Models/booking')
// const ContactUs=require('../Models/contact')
// const Patient=require('../Models/patient')
// const nurse =require('../Models/nurse')
// const Device=require('../Models/devices')
// const PatientPost=require('../Models/posts')
// const Rate=require('../Models/rate')
// const Order=require('../Models/order')

// const route=express.Router();
// const bodyParser=require('body-parser')
// const multer  = require('multer')
// const path=require('path');
// const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');
// route.use(cookieParser())
// route.use(bodyParser.json())
// const { verify }=require('crypto');
// const { error } = require('console');
// route.use(bodyParser.urlencoded({ extended: true }))

// /////////////////////////////////////////
// const fs = require("fs");
// const bcrypt = require("bcryptjs");
// let secret = fs.readFileSync("secret.key");
// const { verifyToken } = require("../shared/auth");


// const key="keystring";
// /////////////////////////////////////////
// ///

// const filestorage = multer.diskStorage({
//     destination: (req, file, callbackfun) => {
//         // console.log(req,file);
//         callbackfun(null, './statics/uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname.replaceAll(" ", ''))
//     }
// })
// const upload = multer({ storage: filestorage });
// var uploadMulti=upload.fields([{ name: 'file1'},{name:'file2'}])



// /////////////////////////////////////////////////////////////////
// // New 15/6/2023 By Hany (There Were A Conflict In Files)
// route.post('/addOrder',verifyToken, async (req, res) => {
//   // console.log(req.body);
//   try {
//     const patient = await Patient.findById(req.query.patientId);
//     const orderData = req.body;
//     let products=patient.cart
//     const newOrder = new Order({...orderData,products: products});
//     console.log(products.length);
//     let totalPrice=0;

//     for(let i=0; i<products.length; i++){
//       var price=products[i].price;
//       let startDate = new Date(req.body.startDate);
//       let endDate = new Date(req.body.endDate);
//      let numofdays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
     
//      let numofdaysofDecice=`Product ${i + 1}: ${numofdays} days`
//      let totalPrice = `total price of product  ${i + 1}: ${price*numofdays}`
//     }

//     patient.order.push(newOrder);

//     if (newOrder.endDate > new Date()) {
//       newOrder.leaseStatus = 'pending';
//       await newOrder.save();
//       await patient.save();
//     } else {
//       newOrder.leaseStatus = 'expired';
//       await newOrder.save();
//       await patient.save();
//     }

//     res.status(200).json({ message: 'Cart and order data saved to patient successfully' });
//   }catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error creating order' });
//       }
// })


// // ////////////////////////////////////////////////////////
// route.get('/',async (req,res)=>{
//     const orders= await Order.find();

//     res.send(orders);

// })

// // update status
// route.put('/:orderId', async (req, res) => {
//     try {
//       const orderId = req.params.orderId;
//     //   here you can make form and when click on submit it will change the route to new value
//       const newStatus = req.body.status;
//       const orders=  await Order.find()
//       const orderStatus = await Order.findByIdAndUpdate(
//         orderId ,
//         { status:newStatus },
//         { new: true }
//       );
//       if (!orderStatus) {
//         return res.json({
//           message: 'Booking not found',
//           status: 404,
//           data: orders,
//           success: false,
//         });
//       }
//       res.json({
//         message: 'Booking status updated successfully!',
//         status: 200,
//         data: booking,
//         success: true,
//       });
//     } catch (e) {
//       res.json({
//         message: 'Error: ' + e,
//         status: 401,
//         data: null,
//         success: false,
//       });
//     }
//   });

// module.exports = route


// New By HANY 20-6-2023
const express=require('express');

const BookingNurse=require('../Models/booking')
const ContactUs=require('../Models/contact')
const Patient=require('../Models/patient')
const nurse =require('../Models/nurse')
const Device=require('../Models/devices')
const PatientPost=require('../Models/posts')
const Rate=require('../Models/rate')
const Order=require('../Models/order')

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
//////negm
const ObjectId=require('mongoose').Types.ObjectId

/////////////////////////////////////////
const fs = require("fs");
const bcrypt = require("bcryptjs");
let secret = fs.readFileSync("secret.key");
// const { verifyToken } = require("../shared/auth");


const key="keystring";
/////////////////////////////////////////
///

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
var uploadMulti=upload.fields([{ name: 'file1'},{name:'file2'}])


//////////////////////////////

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

/////////////////////////////////////////////////////////////////
// route.get('/',async (req,res)=>{
//     const orders= await Order.find();

//     res.send(orders);

// })

// update status
// route.put('/:orderId',verifyToken, async (req, res) => {
//     try {
//       const orderId = req.params.orderId;
//       // console.log(orderId);
//       // console.log(req.body);
//     //   here you can make form and when click on submit it will change the route to new value
//       const newStatus = req.body.patientStatus;
//       // console.log(newStatus);
//       const orders=  await Order.find()
//       const orderStatus = await Order.findByIdAndUpdate(
//         orderId,
//         { patientStatus:newStatus },
//         { new: true }
//       );
//       // console.log(orderStatus);
//       if (!orderStatus) {
//         return res.json({
//           message: 'Booking not found',
//           status: 404,
//           data: orders,
//           success: false,
//         });
//       }
//       res.json({
//         message: 'Booking status updated successfully!',
//         status: 200,
//         data: orderStatus,
//         success: true,
//       });
//     } catch (e) {
//       res.json({
//         message: 'Error: ' + e,
//         status: 401,
//         data: null,
//         success: false,
//       });
//     }
//   });
route.put('/:orderId', verifyToken, async (req, res) => {
  try {

    const orderId = req.params.orderId;
    const newStatus = req.body.patientStatus;
    // console.log("pati",req.query.patientId);
    // console.log("ord",orderId);
    // console.log("statua",newStatus);

    const orderStatus = await Order.findByIdAndUpdate(
      orderId,
      { patientStatus: newStatus },
      { new: true }
    );

    const patient = await Patient.findOneAndUpdate(
      { $and: [{ 'order._id': new ObjectId(orderId) }, { _id: new ObjectId(req.query.patientId)}] },
      { $set: { 'order.$.patientStatus': newStatus } },
      { new: true }
    );
    console.log(patient);
    res.json({
      message: 'Booking status updated successfully!',
      status: 200,
      data: orderStatus,
      success: true,
    });
  } catch (error) {
    res.json({
      message: 'Error: ' + error.message,
      status: 500,
      success: false,
    });
  }
});

route.get('/allOrders', async function(req, res) {
  try {
    const orders = await Order.find({});
    if (orders.length > 0) { 
      res.json({
        message: 'Orders List',
        status: 200,
        data: orders,
        success: true,
      });
    } else {
      res.json({
        message: 'Orders List',
        status: 200,
        data: 'No Orders Found',
        success: false,
      });
    }
  } catch (error) {
    res.json({
      message: 'Error: ' + error.message,
      status: 500,
      success: false,
    });
  }
});

  route.post('/addOrder',verifyToken, async (req, res) => {
    console.log(req.query.patientId);
    try {
      const patient = await Patient.findById(req.query.patientId);
      const orderData = req.body;
      let products=patient.cart
      const newOrder = new Order({...orderData,products: products});
      // console.log(products.length);
      let totalPrice=0;
  
      for(let i=0; i<products.length; i++){
        var price=products[i].price;
        let startDate = new Date(req.body.startDate);
        let endDate = new Date(req.body.endDate);
       let numofdays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
       
       let numofdaysofDecice=`Product ${i + 1}: ${numofdays} days`
       let totalPrice = `total price of product  ${i + 1}: ${price*numofdays}`
      }
  
      patient.order.push(newOrder);
      console.log(patient);
  
      if (newOrder.endDate > new Date()) {
        newOrder.leaseStatus = 'pending';
        await newOrder.save();
        await patient.save();
      } else {
        newOrder.leaseStatus = 'expired';
        await newOrder.save();
        await patient.save();
      }
  
      // res.status(200).json({ message: 'Cart and order data saved to patient successfully' });
      res.json({
        message: 'Cart and order data saved to patient successfully',
        status: 200,
        data: patient,
        success: true,
      });
    }catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error creating order' });
        }
  })
  
  // route.post('/addOrder', verifyToken, async (req, res) => {
  //   const patientId = req.query.patientId;
  //   const orderData = req.body;
  //   const productId = orderData.productId;
  
  //   try {
  //     const patient = await Patient.findById(patientId);
  //     const existingOrder = patient.order.find(order => order.productId === productId);
  
  //     if (existingOrder) {
  //       return res.status(400).json({ message: 'Order already exists for this product' });
  //     }
  
  //     const newOrder = new Order({
  //       ...orderData,
  //       products: patient.cart,
  //       leaseStatus: orderData.endDate > new Date() ? 'pending' : 'expired',
  //     });
  
  //     patient.order.push(newOrder);
  //     await newOrder.save();
  //     await patient.save();
  
  //     res.status(200).json({ message: 'Cart and order data saved to patient successfully' });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Error creating order' });
  //   }
  // });


  // route.post('/addOrder', verifyToken, async (req, res) => {
  //   const patientId = req.query.patientId;
  //   const orderData = req.body;
  //   console.log(req.body);
  //   const productId = orderData.productId;
  
  //   try {
  //     const patient = await Patient.findById(patientId);
  //     const existingOrderIndex = patient.order.findIndex(order => order.productId === productId);
  
  //     if (existingOrderIndex >= 0) {
  //       // Overwrite existing order
  //       const existingOrder = patient.order[existingOrderIndex];
  //       existingOrder.startDate = orderData.startDate;
  //       existingOrder.endDate = orderData.endDate;
  //       existingOrder.patientStatus = orderData.patientStatus;
  //       existingOrder.leaseStatus = orderData.endDate > new Date() ? 'pending' : 'expired';
  
  //       // await existingOrder.save();
  //       await patient.save();
  
  //       return res.status(200).json({ message: 'Order updated successfully' });
  //     }
  
  //     // Create new order
  //     const newOrder = new Order({
  //       ...orderData,
  //       products: patient.cart,
  //       leaseStatus: orderData.endDate > new Date() ? 'pending' : 'expired',
  //     });
  
  //     patient.order.push(newOrder);
  //     await newOrder.save();
  //     await patient.save();
  
  //     res.status(200).json({ message: 'Cart and order data saved to patient successfully' });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Error creating order' });
  //   }
  // });


  // New By Kero
  route.put('/updatePatientStatus/:id', async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { $set: { patientStatus: req.body.patientStatus } },
        { new: true }
      );
  
      if (!order) {
        return res.status(404).json({
          message: 'Order not found',
          status: 404,
          success: false,
        });
      }
  
      res.json({
        message: 'Patient status updated successfully',
        status: 200,
        success: true,
        data: order,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error updating the patient status',
        status: 500,
        success: false,
      });
    }
  });

  // Get OrderStatus By ID
  route.get('/orderStatus/:id', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
  
      if (!order) {
        return res.status(404).json({
          message: 'Order not found',
          status: 404,
          success: false,
        });
      }
  
      res.json({
        message: 'Order status retrieved successfully',
        status: 200,
        success: true,
        data: order.patientStatus,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error retrieving the order status',
        status: 500,
        success: false,
      });
    }
  });
  

module.exports = route