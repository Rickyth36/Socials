const express = require('express');
const { createPostController } = require('../controllers/post.controller');
const postRouter = express.Router();
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage});


postRouter.post('/',upload.single(), createPostController); 

module.exports = postRouter;