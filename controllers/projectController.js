const Services = require('../services')
const User = require('../Modals/userModal');
const Pet = require('../Modals/petModal');
const express = require('express');
const bcrypt = require('bcryptjs')
const { ensureAuthenticated } = require('../config/auth')
const router = express.Router()
const Controllers = require('../controllers')
const passport = require('passport')

// Load pet data controller
const getProjects = (req, res) => {
  Services.ProjectService.getAllProjects(req, res)
}
// Create pet controller
const createProjects = (req, res) => {
  Services.ProjectService.insertProjects(req, res)
}
// Log out controller
const logoutController = (req, res) => {
  req.logout()
  req.flash('success_msg', 'You are logged out')
  res.redirect('/users/login')
}
// Get login
const loginController = (req, res, next) => {
  res.render('login', { title: "Login" })
}
// Post login - passport authentication
const loginAuthenticationController = (req, res, next) => {
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
}
// Register 
const registerController = (req, res) => {
  res.render('register', { title: "register" })
}
// Register Post
const registerPostController = (req, res) => {
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
    Services.ProjectService.userRegisterService(req, res, errors)

  }
}
// Pet delete Controller
const deleteController = (req, res) => {
  const { id } = req.body;
  Services.ProjectService.deleteService(req, res, id)
}
// Pet update controller
const updateController = (req, res) => {
  Services.ProjectService.updateService(req, res)
}
// Get user controller
const getUserAccountController = (req, res) => {
  Services.ProjectService.getUserAccountService(req,res)
}
// Update user account Controller
const updateUserAccountController = (req, res) => {
  Services.ProjectService.updateUserAccountService(req,res)
}
module.exports = {
  getProjects,
  createProjects,
  logoutController,
  loginController,
  loginAuthenticationController,
  registerController,
  registerPostController,
  deleteController,
  updateController,
  getUserAccountController,
  updateUserAccountController
}