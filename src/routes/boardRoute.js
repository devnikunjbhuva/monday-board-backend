const router = require('express').Router();
const multer = require('multer');
const boardsController = require('../controller/boardsController');
const upload = multer({ dest: 'public/data/uploads/' });

router
  .route('/generate-word-doc/:boardId')
  .post(upload.single('file'), boardsController.generateWordDocument);

module.exports = router;
