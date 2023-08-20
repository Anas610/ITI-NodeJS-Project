const express = require('express');
const route = express.Router();
const MyAdmin = require('../Models/admin');
const Admin = require('../Models/admin');
const jwt = require('jsonwebtoken');

// route.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(401).send({ message: 'Invalid email or password' });
//     }
//     if (admin.password !== password) {
//       return res.status(401).send({ message: 'Invalid email orpassword' });
//     }
//     // If email and password are correct, create a session or token and send it back to the client
//     // For example, you can use a package like `jsonwebtoken` to create 
//     // a JWT token and send it back to the client
//     const token = jwt.sign({ email: admin.email }, 'secret');
//     res.send({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Server error' });
//   }
// });

// route.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const admin = await Admin.findOne({ email });
//       if (!admin || admin.password !== password) {
//         return res.status(401).send({
//           message: 'Invalid email or password',
//           status: 401,
//           data: null,
//           success: false,
//         });
//       }
//       res.send({
//         message: 'Login successful',
//         status: 200,
//         data: { admin },
//         success: true,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({
//         message: 'error' + error,
//         status: 500,
//         data: null,
//         success: false,
//       });
//     }
//   });

// route.post('/login', async (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     try {
//       const admin = await Admin.findOne({ email });
//       if (!admin) {
//         return res.status(401).send({
//           message: 'Invalid email or password',
//           status: 401,
//           data: null,
//           success: false,
//         });
//       }if (admin.password !== password) {
//         return res.status(401).send({
//           message: 'Invalid email or password',
//           status: 401,
//           data: null,
//           success: false,
//         });
//       } res.send({
//         message: 'Login successful',
//         status: 200,
//         data: {admin },
//         success: true,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({
//         message: 'Server error',
//         status: 500,
//         data: null,
//         success: false,
//       }) }
//   });

route.post('/adminLogin', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
      const admin = await Admin.findOne({ email });
      if (!admin || admin.password !== password) {
        return res.status(401).send({
          message: 'Invalid email or password',
          status: 401,
          data: null,
          success: false,
        });
      }
      res.send({
        message: 'Login successful',
        status: 200,
        data: { admin },
        success: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Server error',
        status: 500,
        data: null,
        success: false,
      });
    }
  });

// route.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     console.log( req.body);
//     try {
//       const admin = await MyAdmin.findOne({ email });
  
//       if (!admin || admin.password !== password) {
//         return res.status(401).json({
//           message: 'Invalid email or password',
//           status: 401,
//           data: null,
//           success: false,
//         });
//       }
  
//       res.json({
//         message: 'Login successful',
//         status: 200,
//         data: { admin },
//         success: true,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         message: 'Server error',
//         status: 500,
//         data: null,
//         success: false,
//       });
//     }
//   });
  
  


route.get('/admins', async (req, res) => {
    try {
      const admins = await MyAdmin.find();
      res.json(admins);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
 
  // const admin = new MyAdmin({
  //   name: "kero",
  //   image: "patient.png",
  //   email: 'kero@gmail.com',
  //   password: 'kero',
  // });
  
  // admin.save()
  //   .then(() => {
  //     console.log('Admin saved to database');
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  


 


module.exports = route;