const mongoose = require('mongoose');

const Pet = require('../Modals/petModal')

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
            userID:id,
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
const getAllProjects = (req,res) => {  
    var userId = req.user._id
    console.log(userId)
    Pet.find({userID:userId})
        .then(result => {                      
            if (result) {                
                console.log(result)
                res.json({ statusCode: 200, data: result })
            } else {
                res.json({ statusCode: 400, message: err })
            }
        })
        .catch(err => console.log(err))
}

exports.getAllProjects = getAllProjects
exports.insertProjects = insertProjects