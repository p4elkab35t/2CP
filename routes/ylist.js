const express       = require('express'),
      session       = require('express-session'),
      dataFunc      = require('../data/dataFucn'),
      bodyParser    = require('body-parser');
      router        = express.Router(),
      path          = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.cookies['auth0']){
        res.sendFile(path.resolve('public/ylist.html'));
    }
    else{
        res.redirect('/');
    }
});

router.get('/read', function (req, res) {
    let userName = dataFunc.searchForCookie(req.cookies['auth0']);
    if(userName){
        res.send(dataFunc.getTasksData(userName.userId));
    }
});
router.post('/create', function (req, res) {
    let userName = dataFunc.searchForCookie(req.cookies['auth0']);
    if(userName){
        res.send(`${dataFunc.addTask(userName.userId, req.body.taskText, req.body.taskFlags, new Date().toString(), req.body.taskDeadline)}`);
    }
});
router.post('/delete', function (req, res) {
    let userName = dataFunc.searchForCookie(req.cookies['auth0']);
    if(userName){
        dataFunc.deleteTask(req.body.taskId,userName.userId);
    }
});
router.post('/update', function (req, res) {
    let userName = dataFunc.searchForCookie(req.cookies['auth0']);
    if(userName){
        dataFunc.editTask(userName.userId, req.body.taskId, req.body.taskText, req.body.taskFlags, req.body.taskDeadline);
    }
});

module.exports = router;