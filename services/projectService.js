const mongoose = require('mongoose');

const Services = require('../services')
const User = require('../Modals/userModal');
const Pet = require('../Modals/petModal');
const express = require('express');
const bcrypt = require('bcryptjs')
const { ensureAuthenticated } = require('../config/auth')
const router = express.Router()
const Controllers = require('../controllers')
const passport = require('passport')

// insert into database
const insertProjects = (req, res) => {
    let newProject = req.body;
    let id = req.user._id;
    console.log(req.user._id)
    // console.log(newProject)
    const { title, image, link, description } = newProject
    const errors = [];
    if (!title || !image || !link || !description) {
        errors.push({ msg: "Please fill all the fields" })
    }
    if (errors.length > 0) {
        res.json({ errors })
    } else {
        // console.log(newProject)
        const newPet = new Pet({
            userID: id,
            title,
            image,
            link,
            description
        })
        newPet.save()
            .then(pet => {
                if (pet) {
                    res.json({ statusCode: 200, message: "Pet Successfully added", data: pet })
                } else {
                    res.json({ statusCode: 400, message: err })
                }
            })
            .catch(err => console.log(err))
    }

}

// get projects from the database
const getAllProjects = (req, res) => {
    var userId = req.user._id

    Pet.find({ userID: userId })
        .then(result => {
            if (result) {
                res.json({ statusCode: 200, data: result })
            } else {
                res.json({ statusCode: 400, message: err })
            }
        })
        .catch(err => console.log(err))
}

// Login service
const userRegisterService = (req, res, errors) => {
    const { firstName, lastName, email, password, password2 } = req.body;
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
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err))
                    })
                })
            }
        })
}
// Pet delete service
const deleteService = (req, res, id) => {
    Pet.deleteOne({ _id: id })
        .then(record => {
            if (record) {
                res.json({ msg: "success!!!" })
            } else {
                res.json({ msg: "Record dosen't exist!" })
            }
        })
        .catch(err => console.log(err));
}
// Pet update service
const updateService = (req, res) => {
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
}
// Get user details service
const getUserAccountService = (req, res) => {
    User.findOne({ _id: req.user._id })
        .then(user => {
            if (user) {
                let firstName = user.firstName
                let lastName = user.lastName
                let email = user.email
                console.log(typeof firstName)
                res.render('account', {
                    title: "User account",
                    firstName,
                    lastName,
                    email
                })
            }
        })
        .catch(err => { console.log(err) })
}
// Update user account service
const updateUserAccountService = (req, res) => {
    const { firstName, lastName, email } = req.body;
    const id = req.user._id;
  
    User.findByIdAndUpdate({ _id: id }, { $set: { firstName, lastName, email } })
      .then(result => {
        req.flash('success_msg', 'New user saved successfully')
        res.json({
          statusCode: 200,
          success_msg: "User udated"
        })
  
  
      })
      .catch(err => console.log(err))
}
exports.getAllProjects = getAllProjects;
exports.insertProjects = insertProjects;
exports.userRegisterService = userRegisterService;
exports.deleteService = deleteService;
exports.updateService = updateService;
exports.getUserAccountService = getUserAccountService;
exports.updateUserAccountService = updateUserAccountService;