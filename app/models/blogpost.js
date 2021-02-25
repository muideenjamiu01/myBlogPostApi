const mongoose = require('mongoose');

// BlogPost Schema
const BlogPostSchema = new mongoose.Schema({
  
     title: {
    type: String,
    required: true,
    trim: true
        
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.Object,
    required: true,
    ref: 'User'
}
}, {
timestamps: true
})
const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

module.exports = BlogPost
