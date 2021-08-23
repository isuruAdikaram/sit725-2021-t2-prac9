const Services = require('../services')

const getProjects = (res) => {
    Services.ProjectService.getAllProjects(res)
    
}

const createProjects = (data,res) => {
    Services.ProjectService.insertProjects(data,res)
    
}
module.exports ={
    getProjects,createProjects
}