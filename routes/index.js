var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/role', function(req, res, next) {
  res.render('role', { title: 'Maple Story Chat' });
});



module.exports = router;
