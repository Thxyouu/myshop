var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('loginForm', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signupForm', { title: 'Express' });
});


router.get('/service', function(req, res, next) {
  res.render('serviceForm', { title: 'Express' });
});

router.get('/insertform', function(req, res, next) {
  res.render('insertForm', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('contactForm', { title: 'Express' });
});
module.exports = router;
