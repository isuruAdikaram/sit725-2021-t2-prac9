const mongoose = require('mongoose');

const Pet = require('../Modals/petModal')

// insert into database
const insertProjects = (project, res) => {
    console.log(project)
    const { title, image, link, description } = project
    const errors = [];
    if (!title || !image || !link || !description) {
        errors.push({ msg: "Please fill all the fields" })
    }
    if (errors.length > 0) {
        res.json({ errors })
    } else {
        console.log(project)
        const newPet = new Pet({
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
    // console.log(req)
    
    var userId = req.user._id.toString();
    console.log(userId)
    Pet.find({userID:userId})
        .then(result => {
            if (result===undefined) {
                res.json({ statusCode: 400, message: err })
            } else {
                console.log(result)
                res.json({ title: "Image Safe", statusCode: 200, message: "Success", data: result })
            }
        })
        .catch(err => console.log(err))
}

exports.getAllProjects = getAllProjects
exports.insertProjects = insertProjects