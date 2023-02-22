const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose'); //importing mongoose
const Post = require('./models/post'); //importing the post model

const app = express();

//Jns6#$-ttBS5Ubw password for mongodb account
mongoose.connect("mongodb+srv://mehdi:IbXWQftVK2n3iMRU@cluster0.ucprsgw.mongodb.net/node-angular?retryWrites=true&w=majority").
//connecting to the database
then(() => {console.log('Connected to database!')})
.catch(() => {console.log('Connection failed!')});

app.use(bodyParser.json()); //middleware to parse the body of the request
app.use(bodyParser.urlencoded({extended: false})); //middleware to parse the body of the request

app.use((req,res,next)=>{ //middleware to allow cross origin requests
  res.setHeader("Access-Control-Allow-Origin","*"); //allowing all origins
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"); //allowing headers
  res.setHeader("Access-Control-Allow-Methods", //allowing methods
    "GET, POST, PATCH, DELETE, OPTIONS");
  next(); //to allow the request to continue to the next middleware in line
    });


app.post('/api/posts',(req,res,next)=>{ //middleware to handle post requests
  const post = new Post({ //creating a new post
    title: req.body.title, //getting the title from the request body
    content: req.body.content //getting the content from the request body
  });

  console.log(post); //logging the post to the console
  post.save(); //saving the post to the database

  res.status(201).json({ //sending the response as json
    message: 'Post added successfully' //sending a message to the client
  });
});

app.get('/api/posts' ,(req,res ,next)=>{

  const posts = [ //dummy data
    { id: 'fadf12421l',
      title: 'First server-side post',
      content: 'This is coming from the server'
    },
    { id: 'ksajflaj132',
      title : 'Second server-side post',
      content: 'This is coming from the server'
    }
  ];


  res.json({  //sending the response as json
    message: 'Posts fetched successfully!',
    posts: posts
  })
});

module.exports = app; //exporting the app

// Path: backend\app.js
