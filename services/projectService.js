// const client = require('../dbConnect')
// insert into database
const insertProjects = (project, res) => {
    projectCollection.insert(project, (err, result) => {
        if (err) {
            res.json({ statusCode: 400, message: err })
        }
        else {
            res.json({ statusCode: 200, message: "Project Successfully added", data: result })
        }
    });
  
}

// get projects from the database
const getAllProjects = (res) => {
    projectCollection.find({}).toArray((err, result) => {
        if (err) {
            res.json({ statusCode: 400, message: err })
        }
        else {
            res.json({ statusCode: 200, message: "Success", data: result })
        }
        
    });
}

exports.getAllProjects = getAllProjects
exports.insertProjects = insertProjects