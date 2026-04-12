const postModel = require('../models/post.model');
const mongoose = require('mongoose');
const ImageKit = require('@imagekit/nodejs');
const {toFile} = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken')

const imagekit = new ImageKit({
     privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

async function createPostController(req, res){  
    console.log(req.body, req.file);

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Token not provided unauthorized access"
        })
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),   
        fileName: "Test"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id,
        folder: "cohort2-insta-clone"
    })
    

    res.status(201).json({
        message: "Post created successfully",
        post
    });
}

module.exports = {createPostController};