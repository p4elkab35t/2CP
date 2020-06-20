const express       = require('express'),
      session       = require('express-session'),
      dataFunc      = require('../data/dataFunc'),
      bodyParser    = require('body-parser'),
      router        = express.Router(),
      path          = require('path');
/**
 * @swagger
 *
 * /ylist:
 *   get:
 *     description: Login to the application
 *     parameters:
 *       parameters:
 *       - name: cookie-session
 *         description: Auth token
 *         in: header
 *         type: string
 *     produces:
 *       - html/text
 *     responses:
 *       200:
 *          description: data got
 *       302:
 *          description: redirect, cuz no auth token
 */
router.get('/', function(req, res, next) {
    if(req.cookies['auth0']){
        res.sendFile(path.resolve('public/ylist.html'));
    }
    else{
        res.redirect('/');
    }
});

/**
 * @swagger
 *
 * /ylist/logout:
 *   get:
 *     description: Logout from the application
 *     parameters:
 *       - name: cookie-session
 *         description: Auth token
 *         in: header
 *         type: string
 *     responses:
 *       200:
 *         description: logout successful
 */
router.get('/logout', (req, res)=>{
    console.log(req.cookies['auth0']);
    console.log(dataFunc.searchForCookie(req.cookies['auth0']));
    let userName = dataFunc.searchForCookie(req.cookies['auth0']);
    if(userName){
        res.cookie('auth0', 0,{httpOnly: true});
        res.set('Content-Type', 'text/html');
        res.send(`${dataFunc.sessionDelete(userName.userName)}`);
    }
});
/**
 * @swagger
 *
 * /ylist/read:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: cookie-session
 *         description: Auth token
 *         in: header
 *         type: string
 *     responses:
 *       200:
 *         description: tasks read and sent to client
 */
router.get('/read', function (req, res) {
    let userName = dataFunc.searchForCookie(req.cookies['auth0']);
    if(userName){
        console.log({data: dataFunc.getTasksData(userName.userId), user: userName});
        res.send({data: dataFunc.getTasksData(userName.userId), user: userName});
    }
});
/**
 * @swagger
 *
 * /ylist/create:
 *   post:
 *     description: Create task
 *     produces:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: cookie-session
 *         description: Auth token
 *         in: header
 *         type: string
 *       - name: task data
 *         description: data of new task
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: task created
 */
router.post('/create', function (req, res) {
    let userName = dataFunc.searchForCookie(req.cookies['auth0']);
    if(userName){
        res.send(`${dataFunc.addTask(userName.userId, req.body.taskText, req.body.taskFlags, new Date().toString(), req.body.taskDeadline)}`);
    }
});
/**
 * @swagger
 *
 * /ylist/delete:
 *   post:
 *     description: Delete task by id
 *     produces:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: cookie-session
 *         description: Auth token
 *         in: header
 *         type: string
 *       - name: task id
 *         description: If of the task to delete
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: task deleted
 */
router.post('/delete', function (req, res) {
    let userName = dataFunc.searchForCookie(req.cookies['auth0']);
    if(userName){
        res.send(dataFunc.deleteTask(req.body.taskId,userName.userId));
    }
});
/**
 * @swagger
 *
 * /ylist/update:
 *   post:
 *     description: Edit task
 *     produces:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: cookie-session
 *         description: Auth token
 *         in: header
 *         type: string
 *       - name: Task Id
 *         description: Id of the task.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: Task data
 *         description: Data of edited task.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: task updated
 */
router.post('/update', function (req, res) {
    let userName = dataFunc.searchForCookie(req.cookies['auth0']);
    if(userName){
        res.send(dataFunc.editTask(userName.userId, req.body.taskId, req.body.taskText, req.body.taskFlags, req.body.taskDeadline));
    }
});

module.exports = router;

