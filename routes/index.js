const express       = require('express'),
      router        = express.Router(),
      fs            = require('fs'),
      cookieParser  = require('cookie-parser'),
      dataFunc      = require('../data/dataFunc'),
      crypto        = require('crypto'),
      bodyParser    = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended: false});
/**
 * @swagger
 *
 * /t1:
 *   get:
 *     description: Check for auth token
 *     produces:
 *       - html/text
 *     parameters:
 *       - name: cookie-session
 *         description: Auth token
 *         in: header
 *         type: string
 *     responses:
 *       200:
 *         description: auth ok
 */
router.get('/t1', function(req, res, next) {
  if(dataFunc.searchForCookie(req.cookies['auth0'])){
    res.send('1');
  }
  else{
    res.send('2');
  }
});
/**
 * @swagger
 *
 * /signup:
 *   post:
 *     description: Sign up to the application
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: sign up ok
 *       409:
 *         description: duplicate name sign up failed
 *       400:
 *         description: name and password are empty sign up failed
 */
router.post('/signup',urlencodedParser, (req,res,next)=>{
    if(dataFunc.findByName(req.body.login)){
      res.sendStatus(409);
    }
    else if(!req.body.login || !req.body.password){
      res.sendStatus(400);
    }
    else{
      dataFunc.addUser(req.body.login,req.body.password);
      res.sendStatus(201);
    }
});
/**
 * @swagger
 *
 * /signin:
 *   post:
 *     description: Login to the application
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login is ok
 *       403:
 *         description: login is failed
 *       400:
 *         description: login and password are empty
 */
router.post('/signin',urlencodedParser, (req,res,next)=>{
    if(dataFunc.findByName(req.body.login)){
      if(dataFunc.findByName(req.body.login).userPass == req.body.password){
        let sesskey = crypto.randomBytes(16).toString('hex');
        res.cookie('auth0', sesskey,{httpOnly: true});
        dataFunc.sessionAdd(req.body.login, sesskey);
        res.send('1');
      }
      else{
        res.sendStatus(403)
      }
    }
    else if(!req.body.login || !req.body.password){
      res.sendStatus(400);
    }
    else{
      res.sendStatus(403);
    }
});



module.exports = router;
