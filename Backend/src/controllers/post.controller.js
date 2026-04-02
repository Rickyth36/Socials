const postModel = require('../models/post.model');
const mongoose = require('mongoose');

async function createPostController(req, res){
    console.log(req.body);
}

module.exports = {createPostController};