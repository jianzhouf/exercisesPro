var express = require('express');
var router = express.Router();

var user = {
    username: 'admin',
    password: '123456'
}

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
    
    if (req.body.username === user.username && req.body.password === user.password) {
        res.redirect('/home');
    }
    res.redirect('/login');
});
router.get('/logout', function(req, res) {
    res.redirect('/');
});
router.get('/home', function(req, res) {
    
    res.render('web/home', {
        title: '首页',
        user: user
    });
});
router.get('/profile', function(req, res) {
    
    res.render('web/profile', {
        title: '账户',
        user: user
    });
});
router.get('/profile/notice', function(req, res) {

    res.render('web/notice', {
        title: '通知',
        user: user
    });
});
router.get('/profile/message', function(req, res) {

    res.render('web/message', {
        title: '消息',
        user: user
    });
});
router.get('/database', function(req, res) {
    
    res.render('web/database', {
        title: '数据中心',
        user: user
    });
});
router.get('/report', function(req, res) {
    
    res.render('web/report', {
        title: '报表',
        user: user
    });
});

module.exports = router;