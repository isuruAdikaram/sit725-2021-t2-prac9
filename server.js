require('dotenv').config()
const express = require("express");
const indexRoute =require('./routes/projects')
const dbConnection = require('./dbConnect')
const cors = require("cors")
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const session = require('express-session')


const app = express();

app.use(express.static(__dirname + '/public'));


app.use(express.json());
// Express body parser 
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// EJS
app.use(expressLayouts)
app.set('view engine','ejs')

app.use(session({
  secret:'cat',
  resave:true,
  saveUninitialized:true
}))

// Connect flash
app.use(flash())

// Global Vars
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

let http = require('http').createServer(app);
let io = require('socket.io')(http);


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
