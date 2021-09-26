const Services = require('../services')

const getProjects = (req,res) => {
    Services.ProjectService.getAllProjects(req,res)
    
}

const createProjects = (req,res) => {
    Services.ProjectService.insertProjects(req,res)
    
}
module.exports ={
    getProjects,createProjects
}