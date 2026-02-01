const mongoose = require('mongoose');

// mongoose.connect("mongodb+srv://roxsabil25_db_user:oruleiBjH9sNSPNR@cluster0.8uyxvfq.mongodb.net/?appName=Cluster0");

const projectCatagorySchema = new mongoose.Schema({
    title: String,
    decription: String,
    skills: [String],

});

module.exports = mongoose.model('ProjectCatagory',projectCatagorySchema);