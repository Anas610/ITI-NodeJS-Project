
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',
    required: true,
  },
  patientName: {
    type: String,
  },
  patientImg:{
    type:String,
    default:"patient.png"
  },
  patientLocation: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [
    {
      nurseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'nurse',
        required: true,
      },
      nurseName:{
        type:String,
      },
       nurseImg:{
        type:String,
        default:"nurse.png"
      },
      comment: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;