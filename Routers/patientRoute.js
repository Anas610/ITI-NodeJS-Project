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
const { error, log } = require('console');
route.use(bodyParser.urlencoded({ extended: true }))

/////////////////////////////////////////
const fs = require("fs");
const bcrypt = require("bcryptjs");
const patient = require('../Models/patient');
let secret = fs.readFileSync("secret.key");
// const { verifyToken } = require("../shared/auth");


const key="keystring";
/////////////////////////////////////////


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
// var uploadMulti=upload.fields([{ name: 'file1'},{name:'file2'}])
//
///////////////////////Asmaa/////////////////////////////////
// New By Eng.Hany
route.get('/homeroute', async (req, res) => {
  try{
  let Devices = await Device.find();
  let Nurses = await nurse.find();
  let Patients = await Patient.find();
  let BookingNurses = await BookingNurse.find();

  let numOfDevices = Devices.length;
  let numOfNurses = Nurses.length;
  let numOfPatients = Patients.length;
  let numOfBookingNurses = BookingNurses.length;

  const responseObj = {
    numOfDevices: numOfDevices,
    numOfNurses: numOfNurses,
    numOfPatients: numOfPatients,
    numOfBookingNurses: numOfBookingNurses
  };

  res.json({
    message: 'Success',
    status: 200,
    data: responseObj,
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






//**********************register******************** */
 //patient sign-up without images (done)
 route.post("/patientReg",async function (req, res) {
  console.log(req.body);
  if (
      req.body.name == "" ||
      req.body.email == "" ||
      req.body.password == "" ||
      req.body.phoneNumber == "" || 
      req.body.age == "" ||
      req.body.gender == "" ||
      req.body.region == "" ||
      req.body.address == "" ||
      req.body.nationalId == "" 
  ) {
    res.json({
      message: "Error : you should insert valid values",
      status: 400,
      data: req.body,
      success: false,
    });
  } else {
  const unhashedPassp = req.body.password;
  const saltRounds = 10;
  const hashedPassp = await bcrypt.hash(unhashedPassp, saltRounds);
    // console.log(hashedPassn);
      const patientForm = await Patient.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassp ,
          phoneNumber:req.body.phoneNumber,
          age:req.body.age,
          gender:req.body.gender,
          region:req.body.region,
          address:req.body.address,
          nationalId:req.body.nationalId,
        });
        res.json({
          message: "Patient Registered Successfully",
          status: 200,
          success: true,
          });
      // const pathfile = path.join(__dirname, '../Front/Login.html');
      // res.sendFile(pathfile);
  }
});

//********************************patient************************************ */ 
// get patient profile
// route.get('/:patientId', async (req, res) => {
//   try {
//     const patientId = req.params.patientId;
//     const patient = await Patient.findById(patientId);
//     if (!patient) {
//       return res.json({
//         message: 'Patient not found',
//         status: 404,
//         data: null,
//         success: false,
//       });
//     }
//     res.json({
//       message: 'Patient data retrieved successfully!',
//       status: 200,
//       data: patient,
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

// update patient(done)
// route.put('/update', async (req, res) => {
//   let usertoken = jwt.verify(req.cookies.token, key);
//   let patientId = await Patient.findOne({ _id: usertoken.userid });
  
//   if (patientId) {
//     const filter = { _id: patientId._id };
//     const update = { $set: req.body };
//     const options = { new: true }; // to return the updated document
    
//     const updatedPatient = await Patient.findOneAndUpdate(filter, update, options);
    
//     res.json({
//       message: 'Patient updated',
//       status: 200,
//       success: true,
//       data: updatedPatient,
//     });
//   } else {
//     res.json({
//       message: 'No patient found',
//       status: 404,
//       success: false,
//     });
//   }
// });


// route.put('/update/:patientId', async (req, res) => {
//   const patientId = req.params.patientId;
//   const patient = await Patient.findById(patientId);
  
//   if (patientId) {
//     const filter = { _id: patientId._id };
//     const update = { $set: req.body };
//     const options = { new: true }; // to return the updated document
    
//     const updatedPatient = await Patient.findOneAndUpdate(filter, update, options);
    
//     res.json({
//       message: 'Patient updated',
//       status: 200,
//       success: true,
//       data: updatedPatient,
//     });
//   } else {
//     res.json({
//       message: 'No patient found',
//       status: 404,
//       success: false,
//     });
//   }
// });
////////////////////////////Asmaa/////////////////////////////////

////////////////////////////Hany/////////////////////////////////
//////////////route to send contact us////  //  //  //  //  //////////////////////////////////  
route.post('/contactUs',async function(req,res)
{   
    let contactus= await ContactUs.create({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    })
    if(contactus){
        res.json({
          message: "successfully added",
          status: 200,
          data: contactus,
          success: true,
        });
        // console.log(contactus);
      } else if(e) {
        res.json({
          message: "Error:invalid product ," + e,
          status: 401,
          data: null,
          success: false,
        });
      }
    // res.send(contactus) 
})
////////////////////////////Hany/////////////////////////////////

// ///////////////////eng negm////////////////////////////
route.put('/addrate/:patientId/:nurseId', async (req, res) => {
  console.log("Rate ......",req.body);
  const { patientId, nurseId } = req.params;
  const { rate } = req.body;

  if (nurseId) {
    const newRate = await Rate.create({ rate, NurseId: nurseId, patientId });
    const rateResult = await Rate.aggregate([
      { $match: { NurseId: newRate.NurseId } },
      { $group: { _id: '$NurseId', tot: { $avg: '$rate' } } }
    ]);
    const newNurse = await nurse
      .findOneAndUpdate(
        { _id: rateResult[0]._id },
        { $set: { rates: rateResult[0].tot } },
        { new: true }
      )
      .populate('rates');

      await BookingNurse.findOneAndDelete({ NurseId: nurseId })
      // await BookingNurse.find
      res.send(newNurse);
    //  await BookingNurse.find({ patientId: patientId })
  } else {
    res.status(400).send('Invalid nurseId provided.');
  }
});
// ///////////////////eng negm////////////////////////////
///////////////////hany///////////
// route.post('/patients/:id/orders', async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.params.id);
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

// Login backend
route.post('/login', async function(req, res) {
  const uemail = req.body.email;
  const upassword = req.body.password;
  console.log(uemail);
  console.log(upassword);
  try {
    const nurseEmail = await nurse.findOne({ email: uemail });
    const patientEmail = await Patient.findOne({ email: uemail });
    
    if (nurseEmail) {
   const matchn = await bcrypt.compare(upassword, nurseEmail.password);
      console.log(matchn);
      if (matchn) {
        const nurseId = { userid: nurseEmail._id };
        const token = jwt.sign(nurseId, key);
        res.cookie('token', token, { maxAge: 3600000 });
        res.json({
          message: 'Nurse Login Successfully',
          status: 200,
          token: token,
          success: true,
          data: nurseEmail,
        });
      } else {
        res.json({
          message: 'كلمة المرور خاطئة',
          status: 400,
          data: req.body,
          success: false,
        });
      }
    } else if (patientEmail) {
      const matchp = await bcrypt.compare(upassword, patientEmail.password);
      if (matchp) {
        const patientId = { userid: patientEmail._id };
        // console.log(patientId);
        const token = jwt.sign(patientId, key);
        res.cookie('token', token, { maxAge: 3600000 });
        res.json({
          message: 'Patient Login Successfully',
          status: 200,
          token: token,
          success: true,
          data: patientEmail,
        });
      } else {
        res.json({
          message: 'كلمة السر خاطئة',
          status: 400,
          data: req.body,
          success: false,
        });
      }
    } else {
      res.json({
        message: 'بريد إلكتروني غير موجود',
        status: 400,
        data: req.body,
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

//New From Hany
route.get("/patientProfile", verifyToken, async function (req, res) {
// route.get("/patientProfile", async function (req, res) {
  let id = req.query.patientId;
  // let id ="648311e08fab36aac254d7c9";
  // console.log(id);
  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.json({
        message: "Patient not found",
        status: 404,
        data: null,
        success: false,
      });
    }
    res.json({
      message: "Patient data retrieved successfully!",
      status: 200,
      data: patient,
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
});

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



route.put("/editPatientProf/:id",upload.single('profile'), async function (req, res) {
  let patient = await Patient.findByIdAndUpdate(req.params.id,req.body);
  if (!patient) {
    res.json({
      message: "not exists",
      status: 400,
      data: patient,
      success: false,
    });
  } else {
    try {
      patient = await Patient.findById(req.params.id).then((Patient)=>{
        patient.name  = req.body.name,
        patient.phoneNumber  = req.body.phoneNumber,
        patient.region  = req.body.region,
        patient.age  = req.body.age,
        patient.gender  = req.body.gender,
        patient.address  = req.body.address,
        Patient.profile=req.file.filename,
        // Patient.gradeCert = req.files["gradeCert"][0].filename,
        // Patient.profile = req.files["profile"][0].filename,
        // Patient.license = req.files["license"][0].filename,
        Patient.save()
      });
      res.json({
        message: "successfully added",
        status: 200,
        data: nurse,
        success: true,
      });
    } catch (e) {
      res.json({
        message: "Error:invalid patient to update ," + e,
        status: 401,
        data: null,
        success: false,
      });
    }
  }
});
//New From Hany




// Dashboard Sawy
route.get('/allPatients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json({
      message: 'All patients',
      status: 200,
      data: patients,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error getting patients',
      status: 500,
      success: false,
    });
  }
});



// Block Patient By Id
route.put('/blockPatient/:id', async (req, res) => {
  try {
    const patient = await Patient.findOne({ _id: req.params.id });

    if (!patient) {
      return res.status(404).json({
        message: 'Patient not found',
        status: 404,
        success: false,
      });
    }

    patient.isBlocked = !patient.isBlocked; // Toggle the value

    await patient.save();

    console.log(patient.isBlocked);

    res.json({
      message: `Patient ${patient.isBlocked ? 'blocked' : 'unblocked'} successfully`,
      status: 200,
      success: true,
      data: patient,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error toggling the patient block status',
      status: 500,
      success: false
    });
  }
});


// Get Blocked Patient (Kerolos)
route.get('/blockedPatients', async (req, res) => {
  try {
    const patient = await Patient.findOne({ _id: req.query.patientId, isBlocked: true });

    if (!patient) {
      return res.status(404).json({
        message: 'Blocked patient not found',
        status: 404,
        success: false,
      });
    }

    res.json({
      message: 'Blocked patient retrieved successfully',
      status: 200,
      success: true,
      data: patient.isBlocked,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error retrieving the blocked patient',
      status: 500,
      success: false,
    });
  }
});










//search  (done)
route.post('/search', async (req, res) => {
  const searchTerm = req.body.searchTerm;
  console.log('Request body:', req.body);
  console.log(searchTerm);
  const results = await Patient.find({ name: { $regex: `.*${searchTerm}.*`, $options: 'i' } });
  console.log('regex:', results);
  if (results.length > 0) {
    res.json({
      message: 'Search results',
      status: 200,
      success: true,
      data: results,
    });
  } else {
    res.json({
      message: 'No patient found',
      status: 404,
      success: false,
    });
  }
});






module.exports = route