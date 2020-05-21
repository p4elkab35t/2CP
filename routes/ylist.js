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

module.exports = router;