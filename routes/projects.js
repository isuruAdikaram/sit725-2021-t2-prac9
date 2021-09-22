const express = require('express');
const router = express.Router()
const Controllers = require('../controllers')

router.get('/api/projects', (req, res) => {
  Controllers.projectController.getProjects(res)
  
})

router.post('/api/projects', (req, res) => {
  console.log("New Project added", req.body)
  let newProject = req.body;
  Controllers.projectController.createProjects(newProject, res)

})

router.get('/users/login',(req,res)=>{
    res.render('login',{title:"Login"})
})

module.exports = router