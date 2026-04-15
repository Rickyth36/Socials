const express = require('express');
const postController = require('../controllers/post.controller');
// const { createPostController } = require('../controllers/post.controller');
const postRouter = express.Router();
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});


postRouter.post('/',upload.single('file'), postController.createPostController); 

postRouter.get('/',postController.getPostController);

postRouter.get('/details/:postId', postController.getPostDetails)

module.exports = postRouter;