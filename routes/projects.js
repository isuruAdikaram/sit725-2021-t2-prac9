const User = require('../Modals/userModal');
const Pet = require('../Modals/petModal');
const express = require('express');
const bcrypt = require('bcryptjs')
const { ensureAuthenticated } = require('../config/auth')
const router = express.Router()
const Controllers = require('../controllers')
const passport = require('passport')

// Route for loading pet data 
router.get('/', ensureAuthenticated, (req, res) => {
  Controllers.projectController.getProjects(req,res)
})
// Create pet route
router.post('/', ensureAuthenticated, (req, res) => {
  Controllers.projectController.createProjects(req, res)

})
// User logout
router.get('/logout', (req, res) => {
  Controllers.projectController.logoutController(req,res)
})
// Login route
router.get('/login', (req, res, next) => {
  Controllers.projectController.loginController(req,res,next)
})
// Login route
router.post('/login', (req, res, next) => {
  Controllers.projectController.loginAuthenticationController(req,res,next)
})
// Register route
router.get('/register', (req, res) => {
  Controllers.projectController.registerController(req,res)
})
// Register router
router.post('/register', (req, res) => {
  Controllers.projectController.registerPostController(req,res)
})
// Pet delete router
router.delete('/delete', (req, res) => {
  Controllers.projectController.deleteController(req,res)
})
// Pet update router
router.put('/upload', (req, res) => {
  Controllers.projectController.updateController(req,res)
})
// Get user account 
router.get('/account',ensureAuthenticated,(req,res)=>{
  Controllers.projectController.getUserAccountController(req,res)
})
// Update user account
router.put('/account',ensureAuthenticated, (req, res) => {
  Controllers.projectController.updateUserAccountController(req,res)
})
module.exports = router