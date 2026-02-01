const mongoose = require('mongoose');


const projectCatagorySchema = new mongoose.Schema({
    title: String,
    decription: String,
    skills: [String],

});

module.exports = mongoose.model('ProjectCatagory',projectCatagorySchema);