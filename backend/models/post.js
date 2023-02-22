const mongoose = require('mongoose'); //importing mongoose

const postSchema = mongoose.Schema({ //creating a schema for the post 
  title: {type: String, required: true},
  content: {type: String, required: true}
});

module.exports = mongoose.model('Post', postSchema); //exporting the model
