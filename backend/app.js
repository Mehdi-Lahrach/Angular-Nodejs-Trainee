const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
  const post = req.body; //extracting the post from the request body
  console.log(post); //logging the post to the console
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
