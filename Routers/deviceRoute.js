// const express = require('express');

// const BookingNurse = require('../Models/booking')
// const ContactUs = require('../Models/contact')
// const Patient = require('../Models/patient')
// const nurse = require('../Models/nurse');
// const Device = require('../Models/devices')
// const PatientPost = require('../Models/posts')
// const Rate = require('../Models/rate')

// const route = express.Router();
// const bodyParser = require('body-parser')
// const multer = require('multer')
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');
// route.use(cookieParser())
// route.use(bodyParser.json())
// const { verify } = require('crypto');
// const { error } = require('console');
// route.use(bodyParser.urlencoded({ extended: true }))
// /////////////////////////////////
// // this to understand file
// const fs = require("fs");
// const bcrypt = require("bcryptjs");
// let secret = fs.readFileSync("secret.key");
// const { verifyToken } = require("../shared/auth");


// const key = "keystring";
// /////////////////////////////////

// const filestorage = multer.diskStorage({
//   destination: (req, file, callbackfun) => {
//     // console.log(req,file);
//     callbackfun(null, './statics/uploads')
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname.replaceAll(" ", ''))
//   }
// })
// const upload = multer({ storage: filestorage });

// ////////////////////////////////////////////////////////////////////////////////////////

// ///////////////////////////Hany///////////////////////////////
// ///add device to cart
// route.post("/cart/add", verifyToken, async function (req, res) {
//   // route.post("/cart/add", async function (req, res) {
//   jwt.verify(req.token, secret, async (err, data) => {
//     if (err) {
//       res.json({
//         message: "Error:invalid credentials , on token found",
//         status: 401,
//         data: req.token,
//         success: false,
//       });
//     } else {
//       let id = data.Patient._id;
//       // let id="6468c258f2139a765ea35e17"
//       await Patient
//         .findById(id)
//         .then((Patient) => {
//           //check if exists
//           if (Patient.cart.find((item) => item._id == req.body._id)) {
//             res.json({
//               message: "davice already in cart list",
//               status: 400,
//               data: Patient.cart,
//               success: false,
//             });
//           } else {
//             // Patient.cart.push(req.body);
//             Patient.cart.push(req.body);
//             Patient.save();
//             res.json({
//               message: "all patient data",
//               status: 200,
//               data: Patient.cart,
//               success: true,
//             });
//           }
//         })
//         .catch((err) => {
//           res.json({
//             message: "patient not found",
//             status: 400,
//             data: null,
//             success: false,
//           });
//         });
//     }
//   });
// });

// ////show all patient devices
// route.get("/cart", verifyToken, async function (req, res) {
//   // route.get("/cart", async function (req, res) {
//   jwt.verify(req.token, secret, async (err, data) => {
//     if (err) {
//       res.json({
//         message: "Error:invalid credentials , on token found",
//         status: 401,
//         data: req.token,
//         success: false,
//       });
//     } else {
//       let id = data.Patient._id;
//       // let id="6467a3d2fe0fa60aa023a4d7"
//       Patient
//         .findById(id)
//         .then((Patient) => {
//           res.json({
//             message: "all patient cart list",
//             status: 200,
//             data: Patient.cart,
//             success: true,
//           });
//         })
//         .catch((err) => {
//           res.json({
//             message: "Patient not found",
//             status: 400,
//             data: null,
//             success: false,
//           });
//         });
//     }
//   });
// });

// /////////delete from cart
// route.delete("/cart/remove/:id", verifyToken, async function (req, res) {
//   // route.delete("/cart/remove/:id", async function (req, res) {
//   jwt.verify(req.token, secret, async (err, data) => {
//     if (err) {
//       res.json({
//         message: "Error:invalid credentials , on token found",
//         status: 401,
//         data: req.token,
//         success: false,
//       });
//     } else {
//       let id = data.Patient._id;
//       // let id="6467a3d2fe0fa60aa023a4d7"
//       await Patient
//         .findById(id)
//         .then((Patient) => {
//           let result = Patient.cart.filter((item) => {
//             // console.log(item);
//             // return item.id != req.params.id;
//           });
//           Patient.cart = result;
//           Patient.save();
//           res.json({
//             message: "all Patient data",
//             status: 200,
//             data: Patient.cart,
//             success: true,
//           });
//         })
//         .catch((err) => {
//           res.json({
//             message: "Patient not found",
//             status: 400,
//             data: null,
//             success: false,
//           });
//         });
//     }
//   });
// });

// //////////////empty all cart
// route.delete("/cart/empty", verifyToken, async function (req, res) {
//   // route.delete("/cart/empty", async function (req, res) {
//   jwt.verify(req.token, secret, async (err, data) => {
//     if (err) {
//       res.json({
//         message: "Error:invalid credentials , on token found",
//         status: 401,
//         data: req.token,
//         success: false,
//       });
//     } else {
//       let id = data.Patient._id;
//       // let id="6467a3d2fe0fa60aa023a4d7"
//       Patient
//         .findById(id)
//         .then((Patient) => {
//           Patient.cart = []
//           Patient.save()
//           res.json({
//             message: "all Patient cart list",
//             status: 200,
//             data: Patient.cart,
//             success: true,
//           });
//         })
//         .catch((err) => {
//           res.json({
//             message: "Patient not found",
//             status: 400,
//             data: null,
//             success: false,
//           });
//         });
//     }
//   });
// });
// ////////////////////////orders////////////////


// // route.post('orders', async (req, res) => {
// // const Cart=await Patient.find()
// // const dataformofdevice=await 
// // })


// ///////////////////////////Hany///////////////////////////////
// ///////////////////////////Anas///////////////////////////////
// //show device in device details by id
// route.get('/getdevice/:id', async (req, res) => {
//   let device = await Device.findOne({ _id: req.params.id })
//   // if (device) {
//   //     res.send(device);
//   // } else {
//   //     res.status(404).send('page not found')
//   // }
//   if (device) {
//     res.json({
//       message: 'device is available',
//       status: 200,
//       data: device,
//       success: true,
//     });
//   } else {
//     res.json({
//       message: 'device is not available',
//       status: 200,
//       data: 'No device Found',
//       success: false,
//     });
//   }
// })

// // route.get('/PageHome', ((req, res,next) => {
// //   res.sendFile(path.join(__dirname, '../front', 'formtoTest.html'))
// // }))


// //add the device by form of device
// route.post('/addDevice', upload.array("image"), async (req, res) => {
//   let device = await Device.create({
//     name: req.body.name,
//     price: req.body.price,
//     details: req.body.details,
//     joinedDate: req.body.joinedDate,
//     quantity: req.body.quantity,
//     category: req.body.category,
//     status: req.body.status,
//     image: req.files.map(file => file.filename)
//   })
//   // if(device){
//   //     res.send(device)
//   //     // console.log("Added Successfuly");
//   // }else{
//   //     res.send("failed to Add")
//   // }
//   if (device) {
//     res.json({
//       message: 'device is add to device list',
//       status: 200,
//       data: device,
//       success: true,
//     });
//   } else {
//     res.json({
//       message: 'device is not add',
//       status: 200,
//       data: 'device not added',
//       success: false,
//     });
//   }
// })

// //show all devices in home
// route.get('/getdevices', async (req, res) => {
//   let devices = await Device.find()
//   // if (devices) {
//   //     res.send(devices);
//   // } else {
//   //     res.status(404).send('page not found')
//   // }
//   if (devices) {
//     res.json({
//       message: 'devices is available',
//       status: 200,
//       data: devices,
//       success: true,
//     });
//   } else {
//     res.json({
//       message: 'devices is not available',
//       status: 200,
//       data: 'No devices Found',
//       success: false,
//     });
//   }
// })

// //update devices
// route.put('/update/:id', upload.single("image"), async (req, res) => {
//   let dev = await Device.findByIdAndUpdate({ _id: req.params.id }, req.body)
//   // if (dev) {
//   //     console.log("Updated Successfully");
//   //     res.send("Updated Successfully")
//   // } else {
//   //     console.log("Not Updated");
//   // }

//   if (dev) {
//     res.json({
//       message: 'device is  updated successfully',
//       status: 200,
//       data: dev,
//       success: true,
//     });
//   } else {
//     res.json({
//       message: 'device is not  updated successfully',
//       status: 200,
//       data: 'No device Found',
//       success: false,
//     });
//   }
// })

// //delete devices
// route.delete('/delete/:id', async (req, res) => {
//   let del = await Device.findByIdAndDelete({ _id: req.params.id })
//   // if (del) {
//   //     console.log('Deleted');
//   //     res.send('Deleted')
//   // } else {
//   //     console.log('Not Deleted');
//   // }
//   if (del) {
//     res.json({
//       message: 'device is delete',
//       status: 200,
//       data: Device,
//       success: true,
//     });
//   } else {
//     res.json({
//       message: 'device is not dele',
//       status: 200,
//       data: 'del false',
//       success: false,
//     });
//   }
// })

// ///////////////////////////Anas///////////////////////////////


// module.exports = route




























































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
const { error, log } = require('console');
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
///////////////////////////Hany///////////////////////////////
///add device to cart
route.post("/cart/add/:productId", verifyToken, async function (req, res) {
  let id = req.query.patientId;
  let productId = req.params.productId;
  try {
    let patient = await Patient.findById(id);
    if (!patient) {
      res.json({
        message: "patient not found",
        status: 400,
        data: null,
        success: false,
      });
      return;
    }
    let existingProduct = patient.cart.find((item) => item._id == productId);
    if (existingProduct) {
      existingProduct.quantitycart += 1;
      existingProduct.totalPrice = existingProduct.price * existingProduct.quantitycart;

      // console.log(existingProduct);

      patient.markModified('cart');
      await patient.save();
      res.json({
        message: "quantity updated in cart",
        status: 200,
        data: patient.cart,
        success: true,
      });
      return;
    }
    let product = await Device.findById(productId);
    if (!product) {
      res.json({
        message: "device not found",
        status: 400,
        data: null,
        success: false,
      });
      return;
    }
    product.quantitycart = 1;
    product.totalPrice = product.price * product.quantitycart;
    patient.cart.push(product);
    await patient.save();
    res.json({
      message: "device added to cart",
      status: 200,
      data: patient.cart,
      success: true,
    });
  } catch (err) {
    res.json({
      message: "an error occurred",
      status: 500,
      data: null,
      success: false,
    });
  }
});
////


/////////////////
route.get("/cart", verifyToken, async function (req, res) {
  let id = req.query.patientId;
  try {
    let patient = await Patient.findById(id);
    if (!patient) {
      res.json({
        message: "patient not found",
        status: 400,
        data: null,
        success: false,
      });
      return;
    }
    res.json({
      message: "all patient cart list",
      status: 200,
      data: patient.cart,
      success: true,
    });
  } catch (err) {
    res.json({
      message: "an error occurred",
      status: 500,
      data: null,
      success: false,
    });
  }
});
   


/////////////
route.delete("/cart/remove/:id", verifyToken, async function (req, res) {
  let idPatient = req.query.patientId;
  // let itemId=req.params.id;
  // console.log(itemId);
  // console.log(idPatient);
  try {
    let patient = await Patient.findById(idPatient);
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
        status: 404,
        data: null,
        success: false,
      });
    }

    // const cartItem = patient.cart.find((item) => item._id === itemId);
    // if (!cartItem) {
    //   return res.status(404).json({
    //     message: "Cart item not found",
    //     status: 404,
    //     data: null,
    //     success: false,
    //   });
    // }

    patient.cart = patient.cart.filter((item) => item._id != req.params.id);
    await patient.save();

    res.json({
      message: "Cart item deleted successfully",
      status: 200,
      data: patient.cart,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error deleting cart item",
      status: 400,
      data: null,
      success: false,
    });
  }
});




  ////////////empity all cart
  route.delete("/cart/empty", verifyToken, async function (req, res) {
        let id = req.query.patientId;
        Patient
          .findById(id)
          .then((Patient) => {
            Patient.cart = []
            Patient.save()
            res.json({
              message: "all Patient cart list",
              status: 200,
              data: Patient.cart,
              success: true,
            });
          })
          .catch((err) => {
            res.json({
              message: "Patient not found",
              status: 400,
              data: null,
              success: false,
            });
          });
      // }
    });

    
    route.put("/addQCart/:id", verifyToken, async function (req, res) {
      const idPatient = req.query.patientId;
      const itemId = req.params.id;
      const patient = await Patient.findById(idPatient);
    
      try {
        const updatedPatient = await Patient.findOneAndUpdate(
          { $and: [{ 'cart._id': new ObjectId(itemId) }, { _id: new ObjectId(idPatient) }] },
          { $inc: { "cart.$.quantitycart": 1 } },
          { new: true }
        );
        const updatedCartItem = updatedPatient.cart.find((item) => item._id.toString() === itemId);
        updatedCartItem.totalPrice = updatedCartItem.price * updatedCartItem.quantitycart;
        await Patient.findOneAndUpdate(
          { $and: [{ 'cart._id': new ObjectId(itemId) }, { _id: new ObjectId(idPatient) }] },
          { $set: { "cart.$.totalPrice": updatedCartItem.totalPrice } }
        );
        res.json({
          message: "Cart item quantity and total price updated successfully",
          status: 200,
          data: updatedPatient.cart,
          success: true,
        });
      } catch (err) {
        res.status(400).json({
          message: err.message,
          status: 400,
          data: null,
          success: false,
        });
      }
    });

    route.put("/minusQCart/:id", verifyToken, async function (req, res) {
      const idPatient = req.query.patientId;
      const itemId = req.params.id;
      const patient = await Patient.findById(idPatient);
      try {
        const updatedPatient = await Patient.findOneAndUpdate(
          { $and: [{ 'cart._id': new ObjectId(itemId) }, { _id: new ObjectId(idPatient) }] },
          { $inc: { "cart.$.quantitycart": -1 } },
          { new: true }
        );
        const updatedCartItem = updatedPatient.cart.find((item) => item._id.toString() === itemId);
        if (updatedCartItem.quantitycart === 0) {
          await Patient.findOneAndUpdate(
            { _id: new ObjectId(idPatient) },
            { $pull: { cart: { _id: new ObjectId(itemId) } } }
          );
        } else {
          updatedCartItem.totalPrice = updatedCartItem.price * updatedCartItem.quantitycart;
          await Patient.findOneAndUpdate(
            { $and: [{ 'cart._id': new ObjectId(itemId) }, { _id: new ObjectId(idPatient) }] },
            { $set: { "cart.$.totalPrice": updatedCartItem.totalPrice } }
          );
        }
        res.json({
          message: "Cart item quantity and total price updated successfully",
          status: 200,
          data: updatedPatient.cart,
          success: true,
        });
      } catch (err) {
        res.status(400).json({
          message: err.message,
          status: 400,
          data: null,
          success: false,
        });
      }
    });


    ///////////////////////

///////////////////////////Hany///////////////////////////////
///////////////////////////Anas///////////////////////////////
//show device in device details by id
route.get('/getdevice/:id', async (req, res) => {
  let device = await Device.findOne({ _id: req.params.id })
  // if (device) {
  //     res.send(device);
  // } else {
  //     res.status(404).send('page not found')
  // }
  if (device) {
    res.json({
      message: 'device is available',
      status: 200,
      data: device,
      success: true,
    });
  } else {
    res.json({
      message: 'device is not available',
      status: 200,
      data: 'No device Found',
      success: false,
    });
  }
})

// route.get('/PageHome', ((req, res,next) => {
//   res.sendFile(path.join(__dirname, '../front', 'formtoTest.html'))
// }))


//add the device by form of device
route.post('/addDevice', upload.array("image"), async (req, res) => {
  let device = await Device.create({
      name: req.body.name,
      price: req.body.price,
      details: req.body.details,
      joinedDate: req.body.joinedDate,
      quantity: req.body.quantity,
      category: req.body.category,
      status: req.body.status,
      rate: req.body.rate,
      image: req.files.map(file => file.filename)
  })
  // if(device){
  //     res.send(device)
  //     // console.log("Added Successfuly");
  // }else{
  //     res.send("failed to Add")
  // }
  if (device) {
    res.json({
      message: 'device is add to device list',
      status: 200,
      data: device,
      success: true,
    });
  } else {
    res.json({
      message: 'device is not add',
      status: 200,
      data: 'device not added',
      success: false,
    });
  }
})

//show all devices in home
route.get('/getdevices', async (req, res) => {
  let devices = await Device.find()
  // if (devices) {
  //     res.send(devices);
  // } else {
  //     res.status(404).send('page not found')
  // }
  if (devices) {
    res.json({
      message: 'devices is available',
      status: 200,
      data: devices,
      success: true,
    });
  } else {
    res.json({
      message: 'devices is not available',
      status: 200,
      data: 'No devices Found',
      success: false,
    });
  }
})

//update devices

// route.put('/update/:id', upload.single("image"), async (req, res) => {
//   let dev = await Device.findByIdAndUpdate({ _id: req.params.id }, req.body)
//   // if (dev) {
//   //     console.log("Updated Successfully");
//   //     res.send("Updated Successfully")
//   // } else {
//   //     console.log("Not Updated");
//   // }

//   if (dev) {
//     res.json({
//       message: 'device is  updated successfully',
//       status: 200,
//       data: dev,
//       success: true,
//     });
//   } else {
//     res.json({
//       message: 'device is not  updated successfully',
//       status: 200,
//       data: 'No device Found',
//       success: false,
//     });
//   }
// })

//delete devices
// route.delete('/delete/:id', async (req, res) => {
//   let del = await Device.findByIdAndDelete({ _id: req.params.id })
//   // if (del) {
//   //     console.log('Deleted');
//   //     res.send('Deleted')
//   // } else {
//   //     console.log('Not Deleted');
//   // }
//   if (del) {
//     res.json({
//       message: 'device is delete',
//       status: 200,
//       data: Device,
//       success: true,
//     });
//   } else {
//     res.json({
//       message: 'device is not dele',
//       status: 200,
//       data: 'del false',
//       success: false,
//     });
//   }
// })

///////////////////////////Anas///////////////////////////////


// ///////////////////////////////////
route.post('/search', async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm; // Get search query from request body
    const regex = new RegExp(searchTerm, 'i'); // Create case-insensitive regex pattern
    const results = await Device.find({ name: { $regex: regex } }); // Search for devices by name

    if (results.length > 0) {
      res.status(200).json({
        message: 'Search results',
        status: 200,
        success: true,
        data: results,
      });
    } else {
      res.status(404).json({
        message: 'No devices found',
        status: 404,
        success: false,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});
////////////////////////////
// Dashboard
//delete devices
route.delete('/delete/:id', async (req, res) => {
  console.log( req.params.id);
  let del = await Device.findByIdAndDelete({ _id: req.params.id })
  // if (del) {
  //     console.log('Deleted');
  //     res.send('Deleted')
  // } else {
  //     console.log('Not Deleted');
  // }
  if (del) { 
    res.json({
      message: 'device is delete',
      status: 200,
      data: Device,
      success: true,
      });
      } else {
        res.json({
          message: 'device is not dele',
          status: 200,
          data: 'del false',
          success: false,
          });
          }
})


///////////////////////////
//update devices
route.put('/update/:id', upload.array("image"), async (req, res) => {
  if(req.files.length == 3)
  {
    req.body.image =req.files.map(file => file.filename)
    // console.log("if condition")
  }
  else
  {
    // console.log("device.image")
    let device = await Device.findOne({_id:req.params.id})  
    req.body.image =device.image
    // console.log(req.body.image)
    // console.log(device.image)
  }
  let dev = await Device.findByIdAndUpdate({ _id: req.params.id }, req.body)
  if (dev) { 
    // console.log(dev)
    res.json({
      message: 'device is  updated successfully',
      status: 200,
      data: dev,
      success: true,
      });
      } else {
        res.json({
          message: 'device is not  updated successfully',
          status: 200,
          data: 'No device Found',
          success: false,
          });
          }
})

// Define search route
route.post('/search', async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm; // Get search query from request body
    const regex = new RegExp(searchTerm, 'i'); // Create case-insensitive regex pattern
    const results = await Device.find({ name: { $regex: regex } }); // Search for devices by name

    if (results.length > 0) {
      res.status(200).json({
        message: 'Search results',
        status: 200,
        success: true,
        data: results,
      });
    } else {
      res.status(404).json({
        message: 'No devices found',
        status: 404,
        success: false,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});
module.exports = route