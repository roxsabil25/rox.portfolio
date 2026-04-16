require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();


// MongoDB connect
const mongoose = require('mongoose');



const projectCatagoryModel = require('./models/projectCatagory');
const projectmodel = require('./models/projectshocase');

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// EJS Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/projects', async  (req,res)=>{

    const projects = await projectCatagoryModel.find();
    

    res.render('project', { projects })
})
app.get('/contact',(req,res)=>{
    res.render('contact')
})
app.get('/plan',(req,res)=>{
    res.render('plan')
})
app.get('/cv',(req,res)=>{
    res.render('cv')
})



app.post("/createprojectcatagory", async (req, res) => {

    try {
         const skillsArray = req.body.skills.split(',').map(s => s.trim());
        const project = await projectCatagoryModel.create({
            title: req.body.title,
            decription: req.body.decription,
            skills: skillsArray
        });

        res.redirect('/createprojectcatagory');

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

app.get('/createprojectcatagory',async (req,res)=>{

    const project = await projectCatagoryModel.find({});
    
    res.render('rox')
    
    
});

app.post("/projectshocase", async (req, res) => {

    try {
         const skillsArray = req.body.skillss.split(',').map(s => s.trim());
        const project = await projectmodel.create({
            title: req.body.titlee,
            decription: req.body.decriptionn,
            skills: skillsArray,
            link: req.body.link,
            github: req.body.github
        });

        res.redirect("/projectshocase");

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

app.get('/projectshocase', (req, res) => {

  const auth = req.headers.authorization;

  if (!auth) {
    res.setHeader("WWW-Authenticate", "Basic");
    return res.status(401).send("Authentication required.");
  }

  const base64 = auth.split(" ")[1];
  const decoded = Buffer.from(base64, "base64").toString();
  const [username, password] = decoded.split(":");

  if (username === "rox25" && password === "roX25@0#") {
    return res.render("rox");
  }

  res.setHeader("WWW-Authenticate", "Basic");
  res.status(401).send("Invalid credentials");
});


app.get('/projectshocase/:title',async (req,res)=>{
      const title = req.params.title;
    const projects = await projectmodel.find({title});
    
    res.render('projectshocase', { projects })
});

// Health Check Route
app.get('/healthz', (req, res) => {
    res.status(200).send('Server is healthy and running!');
});

// Server

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
    
    // ডাটাবেজ কানেকশন লিসেনিংয়ের পরে দিন
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB Connected"))
        .catch(err => console.log(err));
});