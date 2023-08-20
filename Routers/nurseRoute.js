const express=require('express');

const BookingNurse=require('../Models/booking')
const ContactUs=require('../Models/contact')
const Patient=require('../Models/patient')
const nurse =require('../Models/nurse')
const Device=require('../Models/devices')
const PatientPost=require('../Models/posts')
const Rate=require('../Models/rate')

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



///////////////////////////////Asmaa/////////////////////////////////////////
// New From Hany (Verifying Token 15/6/2023)
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
//************************ Register ************************
///nurse sing-up(done)
route.post("/nurseReg",upload.fields([{name:'gradeCert'},{name:'licenseJob'}]),async function (req, res) {
  if (
    req.body.name == "" ||
    req.body.userName == "" ||
    req.body.email == "" ||
    req.body.password == "" ||
    req.body.phoneNumber == "" ||  
    req.body.age == "" ||
    req.body.gender == "" ||
    req.body.region == "" ||
    req.body.address == "" ||
    req.files["gradeCert"]  == "" ||
    req.files["licenseJob"] == "" || 
    req.body.nationalId == "" 
  ) {
    res.json({
      message: "Error : you should insert valid values",
      status: 400,
      data: req.body,
      success: false,
    });
  } else {
    const unhashedPassn = req.body.password;
    const saltRounds = 10;
    const hashedPassn = await bcrypt.hash(unhashedPassn, saltRounds);
      console.log(hashedPassn);
      const userForm = await nurse.create({
          name: req.body.name,
          userName: req.body.userName,
          email: req.body.email,
          password: hashedPassn,
          phoneNumber:req.body.phoneNumber,
          joinedDate:req.body.joinedDate,
          age:req.body.age,
          gender:req.body.gender,
          region:req.body.region,
          address:req.body.address,
          gradeCert: req.files["gradeCert"][0].filename,
          nationalId:req.body.nationalId,
          licenseJob: req.files["licenseJob"][0].filename 
        });}
        
          res.json({
              message: "Nurse Registered Successfully",
              status: 200,
              success: true,
              });
      // const pathfile = path.join(__dirname, '../Front/Login.html');
      // res.sendFile(pathfile);
  
})

//**************************nurses*********************************** */
//show nurses(done)
route.get('/getNurses',async function(req , res){
  try {
    const nurses = await nurse.find({});
    if (nurses) { 
      res.json({
        message: 'Nurses List',
        status: 200,
        data: nurses,
        success: true,
        });
        } else {
          res.json({
            message: 'Nurses List',
            status: 200,
            data: 'No Nurses Found',
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
})

//search nurses(done)
route.post('/search', async (req, res) => {
  const searchTerm = req.body.searchTerm;
  console.log('Request body:', req.body);
  console.log(searchTerm);
  const results = await nurse.find({ name: { $regex: `.*${searchTerm}.*`, $options: 'i' } });
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
      message: 'No nurses found',
      status: 404,
      success: false,
    });
  }
});

//filter nurses with gender and address only (done)
route.post('/filter', async (req, res) => {
  const gender = req.body.gender;
  const region = req.body.region;
  const rates = req.body.rates;
const filter = {
  $and: [
    { gender: gender },
    { region : region },
    { rates : rates },
  ],
};

const results = await nurse.find(filter);
console.log(results);
if (results.length > 0) { 
  res.json({
    message: 'Filter results',
    status: 200,
    success: true,
    data: results,
    });
    } else {
      res.json({
        message: 'No nurses found',
        status: 404,
        success: false, 
        });
        }
       });

///////////////////////////////Asmaa/////////////////////////////////////////
route.delete('/delete/:id', async function(req, res) {
  try {
    const deletedNurseProfile = await nurse.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Nurse profile successfully deleted!",
      data: deletedNurseProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the nurse profile.",
      data: null,
    });
  }
});

///////////////////////////////hany/////////////////////////////////
//book nurse
// route.post('/bookNurse',async function(req,res)
// {
//     // let decoded = jwt.verify(req.cookies.token, "key");
//     // console.log(decoded.userId);
//     // let uses = await Author.findOne({_id:decoded.userId})
    
//     let nurse= await BookingNurse.create({
//         from: req.body.from,
//         to: req.body.to,
//         service: req.body.service,
//         patientId:req.body.patientId,
//         NurseId:req.body.NurseId,
//         status:req.body.status,
//         price:req.body.price
//     })
//     if(nurse){
//         res.json({
//           message: "successfully added",
//           status: 200,
//           data: nurse,
//           success: true,
//         });
//         // console.log(nurse);
//       } else if(e) {
//         res.json({
//           message: "Error:invalid product ," + e,
//           status: 401,
//           data: null,
//           success: false,
//         });
//       }
// })




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





//////// get nurse prof of me
// route.get('/nurseProfile',async (req,res)=>{
//     // const userId = req.cookies.token;
//     let decodedUthor = jwt.verify(req.cookies.token, "key");
//     // console.log(decodedUthor.userId);
//   //     // let uses = await Author.findOne({_id:decoded.userId})
//   //     // let uses = await Author.findOne({_id:decoded.userId})
//   //     // console.log(uses);
//   //     console.log(decodedUthor);
//   //     // let we = await Author.findById(decodedUthor.userId)
//   //     // let blogs = await Blog.find({"publisher._id":we._id});
//   // // console.log(blogs);
//   // // console.log(us);
//    let authorInfo=await Author.findOne({_id:decodedUthor.userId});
//      if (authorInfo) {
//        res.send(authorInfo)
//      }else{
//        res.status(404).send("not found");
//      }
//     })

/////////////////nurse ////////////////
// route.get("/nurseProfile", verifyToken, async function (req, res) {
//     jwt.verify(req.token, secret, async (err, data) => {
//       if (err) {
//         res.json({
//           message: "Error:invalid credentials , on token found",
//           status: 401,
//           data: req.token,
//           success: false,
//         });
//       } else {
//         let id = data.nurse._id;
//         nurse
//           .findById(id)
//           .then((nurse) => {
//             res.json({
//               message: "found Nurse",
//               status: 200,
//               data: nurse,
//               success: true,
//             });
//           })
//           .catch((err) => {
//             res.json({
//               message: "nurse not found",
//               status: 400,
//               data: null,
//               success: false,
//             });
//           });
//       }
//     });
//   });
  

// New from Elsawy
route.get("/nurseProfile/:id", async function (req, res) {
  const id = req.params.id;
  console.log(id)
  if (!id) {
    return res.json({
      message: "Invalid nurse ID",
      status: 400,
      success: false,
    });
  }
  try {
    const nurseData = await nurse.findById(id);
    if (!nurseData) {
      return res.json({
        message: "Nurse not found",
        status: 400,
        success: false,
      });
    }
    res.json({
      message: "found Nurse",
      status: 200,
      data: nurseData,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: "Error: " + error.message,
      status: 401,
      success: false,
    });
  }
});

route.delete('/:id/experience/:experienceId', async function(req, res) {
  try {
    const nurseProfile = await nurse.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { experience: { _id: req.params.experienceId } } },
      { new: true }
    );
    res.json({
      message: "Experience successfully deleted!",
      status: 200,
      data: nurseProfile,
      success: true,
    });
  } catch (e) {
    res.json({
      message: "Error:" + e,
      status: 401,
      data: null,
      success: false,
    });
  }
});

route.delete('/:id/education/:educationId', async function(req, res) {
  try {
    const nurseProfile = await nurse.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { education: { _id: req.params.educationId } } },
      { new: true }
    );
    res.json({
      message: "Education successfully deleted!",
      status: 200,
      data: nurseProfile,
      success: true,
    });
  } catch (e) {
    res.json({
      message: "Error:" + e,
      status: 401,
      data: null,
      success: false,
    });
  }
});



// New from Elsawy
  /////////////////update nurse profile //
// From Elsawy
route.put("/editNurseProf/:id", upload.single("profile"), async function (req, res) {
  let Nurse = await nurse.findByIdAndUpdate(req.params.id, req.body);
  console.log(req.file, "sdk");
  console.log(req.body);

  if (!Nurse) {
    res.json({
      message: "not exists",
      status: 400,
      data: req.params.id,
      success: false,
    });
  } else {
    let img;
    if (!req.file) {
      // no file uploaded, keep the old profile picture
      img = Nurse.profile;
    }

    try {
      nurse = await nurse
        .findById(req.params.id)
        .then((nurse) => {
          nurse.name = req.body.name;
          nurse.phoneNumber = req.body.phoneNumber;
          nurse.age = req.body.age;
          nurse.gender = req.body.gender;
          nurse.region = req.body.region;
          nurse.address = req.body.address;
          nurse.about = req.body.about;
          nurse.skills = req.body.skills;
          nurse.shiftPrice = req.body.shiftPrice;
          nurse.experienceYear = req.body.experienceYear;
          nurse.profile = req.file.filename || img;
          nurse.save();
        });
      res.json({
        message: "successfully updated",
        status: 200,
        data: nurse,
        success: true,
      });
    } catch (e) {
      res.json({
        message: "Error: invalid nurse to update, " + e,
        status: 401,
        data: null,
        success: false,
      });
    }
  }
});







// From Elsawy
  // route.put("/editNurseProf/:id",upload.fields([{name:'gradeCert'},{name:'license'},{name:'profile'}]), async function (req, res) {
  //   let Nurse = await nurse.findByIdAndUpdate(req.params.id,req.body);
  //   if (!Nurse) {
  //     res.json({
  //       message: "not exists",
  //       status: 400,
  //       data: req.params.id,
  //       success: false,
  //     });
  //   } else {
  
  //   //   let img;
  //   //   if(!req.file){
  //   //       //no file keep old
  //   //       img = exist.imgURL
  //   //   }
  //   //   else{
  //   //       img = await productController.get_Image_for_product(req.file);
  //   //   }
  
  //     try {
  //       nurse = await nurse.findById(req.params.id).then((nurse)=>{
  //         nurse.name  = req.body.name,
  //         nurse.phoneNumber  = req.body.phoneNumber,
  //         nurse.age  = req.body.age,
  //         nurse.gender  = req.body.gender,
  //         nurse.region  = req.body.region,
  //         nurse.address  = req.body.address,
  //         nurse.shiftPrice  = req.body.shiftPrice,
  //         nurse.gradeCert = req.files["gradeCert"][0].filename,
  //         nurse.profile = req.files["profile"][0].filename,
  //         nurse.license = req.files["license"][0].filename,
  //         nurse.save()
  //       });
  //       res.json({
  //         message: "successfully added",
  //         status: 200,
  //         data: nurse,
  //         success: true,
  //       });
  //     } catch (e) {
  //       res.json({
  //         message: "Error:invalid nurse to update ," + e,
  //         status: 401,
  //         data: null,
  //         success: false,
  //       });
  //     }
  //   }
  // });


  ////////////////addEducationAndExperience
  // route.post('/addEducationAndExperience/:id', async function(req, res) {
  //   const  education = req.body;
  //   const experience  = req.body;
  //   console.log(req.body);
  //   if(education){
  //     try {
  //       const nurseProfile = await nurse.findOneAndUpdate(
  //         { _id: req.params.id},
  //         { $push: { education} },
  //         { new: true }
  //       );
  //       res.json({
  //         message: "Education successfully added!",
  //         status: 200,
  //         data: nurseProfile,
  //         success: true,
  //       });
  //     } catch (e) {
  //       res.json({
  //         message: "Error: " + e,
  //         status: 401,
  //         data: null,
  //         success: false,
  //       });
  //     }
  //   }
  //   else if(experience){
  //     try {
  //       const nurseProfile = await nurse.findOneAndUpdate(
  //         { _id: req.params.id },
  //         { $push: { experience } },
  //         { new: true }
  //       );
  //       res.json({
  //         message: "Experience successfully added!",
  //         status: 200,
  //         data: nurseProfile,
  //         success: true,
  //       });
  //     } catch (e) {
  //       res.json({
  //         message: "Error: " + e,
  //         status: 401,
  //         data: null,
  //         success: false,
  //       });
  //     }
  //   }

  // });

  // New from Elsawy
  route.post('/addEducationAndExperience/:id', async function(req, res) {
    const  education = req.body.education;
    const experience  = req.body.experience;
    if(education){
      try {
        console.log(req.body)
        console.log("req.body")
      
        
        const nurseProfile = await nurse.findOneAndUpdate(
          { _id: req.params.id},
          { $push: { education} },
          { new: true }
        );
        res.json({
          message: "Education successfully added!",
          status: 200,
          data: nurseProfile,
          success: true,
        });
      } catch (e) {
        res.json({
          message: "Error: " + e,
          status: 401,
          data: null,
          success: false,
        });
      }
    }
    else if(experience){
      try {
        const nurseProfile = await nurse.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { experience } },
          { new: true }
        );
        console.log(req.body)
        console.log("req.body")
        // alert()
        res.json({
          message: "Experience successfully added!",
          status: 200,
          data: nurseProfile,
          success: true,
        });
      } catch (e) {
        console.log("req.error")

        res.json({
          message: "Error: " + e,
          status: 401,
          data: null,
          success: false,
        });
      }
    }

  });
  
  
  // New from Elsawy

  // edit education for nurse id and the object of education 
  route.put('/:id/education/:educationId', async function(req, res) {
    try {
      const nurseProfile = await nurse.findOneAndUpdate(
        { _id: req.params.id, "education._id": req.params.educationId },
        { $set: { "education.$": req.body } },
        { new: true }
      );
      res.json({
        message: "Education successfully updated!",
        status: 200,
        data: nurseProfile,
        success: true,
      });
    } catch (e) {
      res.json({
        message: "Error:" + e,
        status: 401,
        data: null,
        success: false,
      });
    }
  });

// edit experience for nurse id and the object of education 
  route.put('/:id/experience/:experienceId', async function(req, res) {
    try {
      const nurseProfile = await nurse.findOneAndUpdate(
        { _id: req.params.id, "experience._id": req.params.experienceId },
        { $set: { "experience.$": req.body } },
        { new: true }
      );
      res.json({
        message: "Experience successfully updated!",
        status: 200,
        data: nurseProfile,
        success: true,
      });
    } catch (e) {
      res.json({
        message: "Error:" + e,
        status: 401,
        data: null,
        success: false,
      });
    }
  });
  


  
///////////////////////////////hany/////////////////////////////////
// get top rate of nurse
route.get('/top-rated', async (req, res) => {
  try {
    // you can add or make limit if you need to get nurse
    const topNurses = await nurse.find({ rates: { $gt: 3 } },{ name: 1, rates: 1, profile: 1, region: 1 , available: 1}).sort({ rates: -1 }).limit(10);
    res.json({
      message: "this is top rated nurse",
      status: 200,
      data: topNurses,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting top-rated nurses' });
  }
});








// const nurseData = {
//   name: "Memo",
//   email: "Memo.gmail@example.com",
//   password: "123456789",
//   phoneNumber: "01111175890",
//   nationalId: "31005206857890",
//   age: 24,
//   gender: "male",
//   region: "Egypt",
//   address: "Aswan",
//   gradeCert: "Front End Developer",
//   license: "Example License",
//   shiftPrice: 650,
//   Availability: [
//     {
//       from: "8:00 AM",
//       to: "12:00 PM"
//     },
//     {
//       from: "1:00 PM",
//       to: "5:00 PM"
//     }
//   ],
//   education: [
//     {
//       degree: "Bachelor's Degree",
//       field: "Nursing",
//       school: "Aswan University",
//       fromDate: new Date("2015-09-01"),
//       toDate: new Date("2019-06-30"),
//       description: "Example Education Description"
//     }
//   ],
//   experience: [
//     {
//       title: "Registered Nurse",
//       employmentType: "Full-time",
//       company: "Example Hospital",
//       location: "Example City",
//       fromDate: new Date("2019-07-01"),
//       toDate: new Date("2022-12-31"),
//       description: "Example Experience Description"
//     }
//   ],
//   rates: 5,
//   TotalBalance: 1000
// };

// nurse.create(nurseData)
//   .then(createdNurse => {
//     console.log("Nurse created successfully:", createdNurse);
//   })
//   .catch(error => {
//     console.error("Error creating nurse:", error);
//   });

///// Anas /////
route.put('/editDates', async (req, res) => {
  try {
    const nurseId = req.query.patientId;
    const nurseDates = req.body
    const nurseProfile = await nurse.findById(nurseId);
      const dayAvailability  = nurseProfile.available.find((item) => item.day === nurseDates.available.day);
      if(dayAvailability){
        dayAvailability.times = [...nurseDates.available.times]
        await nurseProfile.save();
      }else {
        nurseProfile.available.push(nurseDates.available)
        console.log(nurseDates.available);
        await nurseProfile.save();
      }

    res.json({
      message: "Dates successfully Added!",
      status: 200,
      data: nurseProfile,
      success: true,
    });
  }
  catch (e) {
    res.json({
      message: "Error:" + e,
      status: 401,
      data: null,
      success: false,
    });
  }
})


// New From Elsawy For ReactNative
route.put("/editNurseProfNative/:id", upload.single("profile"), async function (req, res) {
  console.log(req.file, "sdk");
  console.log(req.body);
  let Nurse = await nurse.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    age: req.body.age,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    region: req.body.region,
    about: req.body.about,
    skills: req.body.skills,
    shiftPrice: req.body.shiftPrice,
    experienceYears: req.body.experienceYears,
    profile: req.file ? req.file.filename : undefined,
  });

  if (!Nurse) {
    res.json({
      message: "Nurse not found",
      status: 400,
      data: req.params.id,
      success: false,
    });
  } else {
    res.json({
      message: "successfully updated",
      status: 200,
      data: Nurse,
      success: true,
    });
  }
});

module.exports = route