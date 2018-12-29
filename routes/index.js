var express = require('express');
var cookies=require('cookie-parser');
var router = express.Router();
router.use(cookies());

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.account_name){
    res.render('index',{account_name:req.cookies.account_name,avatar_img:req.cookies.account_avatar});
  }else{
    res.render('login');
  }
});

module.exports = router;
