var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Exercises Project',
        developer: 'xuweijian'
    });
});
router.route('/login').get(function(req, res) {
    res.render('web/login', {
        title: '用户登录'
    });
}).post(function(req, res) {
    var user = {
        username: 'admin',
        password: '123456'
    }
    if (req.body.username === user.username && req.body.password === user.password) {
        res.redirect('/home');
    }
    res.redirect('/login');
});
router.get('/logout', function(req, res) {
    res.redirect('/');
});
router.get('/home', function(req, res) {
    var user = {
        username: 'admin',
        password: '123456'
    }
    res.render('web/home', {
        title: 'Home',
        user: user
    });
});
module.exports = router;