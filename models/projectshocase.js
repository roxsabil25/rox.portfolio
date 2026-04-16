const mongoose = require('mongoose');


const projectshocaseSchema = new mongoose.Schema({
    title: String,
    decription: String,
    skills: [String],
    link: String,
    github:String

});

module.exports = mongoose.model('ProjectShowcase', projectshocaseSchema);