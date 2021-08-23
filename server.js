require('dotenv').config()
const express = require("express");
const indexRoute =require('./routes/projects')
const dbConnection = require('./dbConnect')
const cors = require("cors")
const path = require('path')

const app = express();

app.use(express.static(__dirname + '/public'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


let http = require('http').createServer(app);
let io = require('socket.io')(http);

const itemsList =[
  {
    title:"Cowardly-cat",
    image:"assets/cat-1.jpg",
    link:"stupidcats.com",
    description:"wacked birds all day"
  },
  {
    title:"Enlightened-cat",
    image:"assets/cat-2.jpg",
    link:"evenstupidercats.com",
    description:"harased dogs all day"
  }
]

var port = process.env.PORT || 3000;

// code is roted to roter>project.js
app.use('/',indexRoute)

app.use((req,res,next)=>{
  res.status(404).sendFile(path.join(__dirname,'public','404.html'))
})
// socket test
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
  }, 1000);

});


http.listen(port,()=>{
  console.log("Listening on port ", port);
  // createColllection("pets")
  dbConnection.createColllection("pets")
});

//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();
