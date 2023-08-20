const express=require('express');

const BookingNurse=require('../Models/booking')
const ContactUs=require('../Models/contact')
const Patient=require('../Models/patient')
const nurse =require('../Models/nurse')
const Device=require('../Models/devices')
const Post=require('../Models/posts')
const Rate=require('../Models/rate')

// const config = require('config');
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
const { verifyToken } = require("../shared/auth");


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



///////////////////////////////Hany/////////////////////////////////////////
const auth = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
  
    try {
      const decoded = jwt.verify(token, config.get('jwtSecret'));
      req.patientId = decoded.patient.id;
    //   req.patientId = "6467a3d2fe0fa60aa023a4d7"
      req.nurseId = decoded.nurse.id;
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };


// Create a new post
route.post('/', async (req, res) => {
    try {
        const { title, content, patientImg } = req.body;
    const patientId = req.patientId;
    const post = new Post({ patientId, title, content,patientImg });
    await post.save();
      // await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // Add a comment to a post
  route.post('/comments/:postId/:nurseId', async (req, res) => {
    // console.log("nananana");
    // console.log(req.params, req.body);
      try {
        // let nurseId="64669b19537a8ae96e4d0b46"
        const { comment,nurseName,nurseImg } = req.body;
       const nurseId = req.params.nurseId;
       

      //   to check if this post is in posts or not
        const post = await Post.findById(req.params.postId);
        const nurseCom = await nurse.findById(nurseId);
        if (!post && !nurseCom) {
          return res.status(404).json({ msg: 'Post not found' });
        }
        post.comments.push({ nurseId , comment,nurseName,nurseImg });
        await post.save();
        res.json(post);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    });
//////////////////////////////Anas/////////////////////////////

//dashboard
route.get('/posts', async (req, res) => {
  try {
    let posts = await Post.find();
    // let posts = await Post.find().populate('patientId', 'name');
    // console.log(name,posts);
    
    if (posts) {

      // console.log(posts[0].patientId);
      const patientPosts = posts.map(async (post) => {
        const patient = await Patient.findById(post.patientId);
        // console.log(patient);
        return {
          _id: post._id,
          title: post.title,
          content: post.content,
          patientName: post.patientName,
          patientImg: post.patientImg,
          patientLocation: post.patientLocation,
          createdAt: post.date,
          comments: post.comments,
          commentDate: post.comments.date
        };
      });
      const resolvedPatientPosts = await Promise.all(patientPosts);
      // console.log(posts);
      // console.log(resolvedPatientPosts);
      res.json({
        message: 'All Posts',
        status: 200,
        data: resolvedPatientPosts,
        success: true
      });
    } else {
      res.json({
        message: 'No Posts',
        status: 404,
        data: 'Posts Not Available',
        success: false
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      message: 'Error',
      status: 500,
      data: 'Internal Server Error',
      success: false
    });
  }
});







//get patient post by id
route.get('/patientPosts/:id', async (req, res) => {
  let post = await Post.findOne({patientId:req.params.id});
  // let posts = await Post.find({});
  if (post) {
    res.json({
      message: 'patient data',
      status: 200,
      data: post,
      success: true
    })
  }else {
    res.json({
      message: 'No patient data',
      status: 404,
      data: 'No patient data Available',
      success: false
    })
  }
})

/////////////////////////////////////////
route.get('/patientPosts', async (req, res) => {
  try {
    // const posts = await Post.find().populate({path:'patientId', model:'patients'},{{path:'comments', model:'nurseprofiels'}});
    const posts = await Post.find().populate({path:'patientId', model:'patients'});
    if (posts.length) {
      const patientPosts = posts.map(post => ({
        _id: post._id,
        title: post.title,
        content: post.content,
        // patientName: post.patientId.name,
        createdAt: post.date,
        // patientLocation: post.patientId.region,
        comments: post.comments,
      }));
      res.json({
        message: 'All Posts',
        status: 200,
        data: patientPosts,
        success: true,
      });
    } else {
      res.json({
        message: 'No Posts',
        status: 404,
        data: 'Posts Not Available',
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
  }
});




route.get('/nurseComments', async (req, res) => {
  try {
    const comments = await Post.find().populate({path:'comments', model:'nurseprofiels'});
    if (comments) {
      const nurseComments = comments.map(post => ({
        _id: post._id,
        title: post.title,
        content: post.content,
        // patientName: post.patientId.name,
        nurseId : post.comments[0].nurseId,
        commentofthisNurse : post.comments[0].comment,
        // nurseName : post.nurseId.name,

      }));
      // console.log(comments);
      res.json({
        message: 'All Posts',
        status: 200,
        data: nurseComments,
        success: true,
      });
    } else {
      res.json({
        message: 'No Posts',
        status: 404,
        data: 'Posts Not Available',
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
  }
});

// New From Asmaa
route.post('/addPost/:patientId', async (req, res) => {
  // console.log(req.body, req.params.patientId);
  try {
    const patientId = req.params.patientId;
      const { title, content, patientName, patientLocation } = req.body;
      // console.log(req.body);
  // const patientId = req.patientId;
  const post = new Post({ patientId, title, content, patientName, patientLocation });
  await post.save();
    // await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

///////////////////////////By Kerolos//////////////////
// Filter Posts
route.post('/postsFilter', async (req, res) => {
  const patientLocation = req.body.patientLocation;
   console.log(patientLocation);
  const filter = {
    $and: [
      { patientLocation: patientLocation },
    ],
  };
  try {
    const results = await Post.find(filter);
    // console.log('Filtered posts:', results);
    if (results.length > 0) {
      res.json({
        message: 'Filter results',
        status: 200,
        success: true,
        data: results,
      });
    } else {
      res.json({
        message: 'No posts found',
        status: 404,
        success: false,
      });
    }
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({
      message: 'Internal server error',
      status: 500,
      success: false,
    });
  }
});




///////////////////////// Search Posts /////////////////////////
route.post('/search', async (req, res) => {
  const searchTerm = req.body.searchTerm;
  console.log('Request body:', req.body);
  console.log(searchTerm);
  try {
    const results = await Post.find({
      $or: [
        { title: { $regex: `.*${searchTerm}.*`, $options: 'i' } },
        { content: { $regex: `.*${searchTerm}.*`, $options: 'i' } },
      ],
    });

    console.log('Search results:', results);
    
    if (results.length > 0) {
      res.json({
        message: 'Search results',
        status: 200,
        success: true,
        data: results,
      });
    } else {
      res.json({
        message: 'No posts found',
        status: 404,
        success: false,
      });
    }
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({
      message: 'Internal server error',
      status: 500,
      success: false,
    });
  }
});
/////////////////////////////////
route.get('/patientPosts/:id', async (req, res) => {
  try {
    const posts = await Post.find({ patientId: req.params.id });

    if (posts.length > 0) {
      res.json({
        message: 'Patient data found',
        status: 200,
        data: posts,
        success: true
      });
    } else {
      res.json({
        message: 'No patient data found',
        status: 404,
        data: 'No patient data available',
        success: false
      });
    }
  } catch (error) {
    res.json({
      message: 'Error retrieving patient data',
      status: 500,
      error: error.message,
      success: false
    });
  }
});
/////////////////////////////////
  module.exports=route;

