const User = require('../Modals/userModal');
const Pet = require('../Modals/petModal');
const express = require('express');
const bcrypt = require('bcryptjs')
const { ensureAuthenticated } = require('../config/auth')
const router = express.Router()
const Controllers = require('../controllers')
const passport = require('passport')

router.get('/', ensureAuthenticated, (req, res) => {
  Controllers.projectController.getProjects(req,res)

})

router.post('/', ensureAuthenticated, (req, res) => {
  // console.log("New Project added", req.body)
  Controllers.projectController.createProjects(req, res)

})

// User logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You are logged out')
  res.redirect('/users/login')
})
// Login route
router.get('/login', (req, res, next) => {
  res.render('login', { title: "Login" })
})
// Login route
router.post('/login', (req, res, next) => {
  console.log(req.body)
  passport.authenticate('local', function (err, user, info) {
    console.log(info)
    if (err) {
      return next(err);
    }
    if (!user) {

      return res.redirect('/users/login');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });

  })(req, res, next);
})

// Register route
router.get('/register', (req, res) => {
  res.render('register', { title: "register" })
})
// Register router
router.post('/register', (req, res) => {
  const { firstName, lastName, email, password, password2 } = req.body;
  console.log(req.body)
  let errors = [];

  if (!firstName || !lastName || !email || !password || !password2) {
    errors.push({ msg: "Please fill all the fields" })
  }

  if (password !== password2) {
    errors.push({ msg: "Password incorrect" })
  }

  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" })
  }

  if (errors.length > 0) {
    res.render('register', {
      title: "Register",
      firstName,
      lastName,
      email,
      password,
      password2,
      errors
    })
  }
  else {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          errors.push({ msg: " Email already registered" })
          res.render('register', {
            title: "Register",
            firstName,
            lastName,
            email,
            password,
            password2,
            errors
          })
        } else {

          const newUser = new User({
            firstName,
            lastName,
            email,
            password
          });

          // Hash password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) {
                throw err
              }
              // Set password to hash
              newUser.password = hash;
              // Save usr
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in')
                  res.redirect('/login')
                })
                .catch(err => console.log(err))
            })
          })
        }
      })
  }
})
// Pet delete router
router.delete('/delete', (req, res) => {
  const { id } = req.body;
  console.log(id)
  Pet.deleteOne({ _id: id })
    .then(record => {
      if (record) {
        res.json({ msg: "success!!!" })
      } else {
        res.json({ msg: "Record dosen't exist!" })
      }
    })
    .catch(err => console.log(err));
})
router.put('/upload', (req, res) => {
  console.log(req.body)
  const { id, title, image, link, description } = req.body

  Pet.findByIdAndUpdate({ _id: id }, { $set: { title, image, link, description } })
    .then(result => {
      if (result) {
        res.json({ statusCode: 200, msg: "Pet record updated" })
      } else {
        res.json({ statusCode: 400, msg: "Unable to find record" })
      }
    })
    .catch(err => console.log(err))
})
// Get user account 
router.get('/account',ensureAuthenticated,(req,res)=>{
  User.findOne({_id:req.user._id})
    .then(user=>{
      if(user){
        let firstName = user.firstName
        let lastName = user.lastName
        let email = user.email
        console.log(typeof firstName)
        res.render('account',{
          title:"User account",
          firstName,
          lastName,
          email
        })
      }
    })
    .catch(err=>{console.log(err)})
})
// Update user account
router.put('/account',ensureAuthenticated, (req, res) => {
  const {firstName,lastName,email} = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate({ _id: id }, { $set: { firstName, lastName, email} })
    .then(result => {
        let firstName = result.firstName
        let lastName = result.lastName
        let email = result.email
      
        req.flash('success_msg', 'New user saved successfully')
        res.json({
          statusCode:200,
          success_msg:"User udated"
        })
      
        
    })
    .catch(err => console.log(err))
})
module.exports = router