const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://roxsabil25_db_user:oruleiBjH9sNSPNR@cluster0.8uyxvfq.mongodb.net/?appName=Cluster0");

const projectshocaseSchema = new mongoose.Schema({
    title: String,
    decription: String,
    skills: [String],
    link: String,
    github:String

});

module.exports = mongoose.model('ProjectShowcase', projectshocaseSchema);