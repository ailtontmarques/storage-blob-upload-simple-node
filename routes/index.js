var express = require('express');
var router = express.Router();
const controller = require('../controllers/controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', controller.uploadImage);

module.exports = router;
