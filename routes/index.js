const express       = require('express'),
      router        = express.Router(),
      fs            = require('fs'),
      cookieParser  = require('cookie-parser'),
      dataFunc      = require('../data/dataFucn'),
      crypto        = require('crypto'),
      bodyParser    = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended: false});
/* GET home page. */
router.get('/t1', function(req, res, next) {
  if(req.cookies['auth0']){
    res.send('1');
  }
  else{
    res.send('2');
  }
});

router.post('/signup',urlencodedParser, (req,res,next)=>{
  if(!req.body) return res.sendStatus(400);
  else{
    if(dataFunc.findByName(req.body.login)){
      res.send('Error, user is already exists');
    }
    else{
      dataFunc.addUser(req.body.login,req.body.password);
    }
  }
});
router.post('/signin',urlencodedParser, (req,res,next)=>{
  if(!req.body) return res.sendStatus(400);
  else{
    console.log(req.body.login);
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
    else{
      res.sendStatus(503);
    }
  }
});



module.exports = router;
