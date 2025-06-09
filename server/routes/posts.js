const express = require('express');
const router = express.Router();
const controller = require('../controllers/postsController');
const upload = require('../middlewares/upload');

router.get('/', controller.getAllPosts);
router.get('/:id', controller.getPostById);
router.post('/', upload.single('file'), controller.createPost);
router.put('/:id', controller.updatePost);
router.delete('/:id', controller.deletePost);

module.exports = router;
