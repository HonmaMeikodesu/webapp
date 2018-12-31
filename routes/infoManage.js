var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
var cookies=require('cookie-parser');
router.use(cookies());
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'webapp'
});

connection.connect();
router.get('/', function(req, res, next) {
    var sql="SELECT * FROM user_info WHERE account_name=?";
    var sqlpara=req.cookies.account_name;
    connection.query(sql,sqlpara,function (err,result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.send(result);
    })
});

router.post('/change',function (req,res,next) {
    var sql= 'UPDATE user_info SET account_sex = ?,account_intro=? WHERE account_name=?'
    var sqlpara=[req.body.sex,req.body.account_intro,req.cookies.account_name];
    connection.query(sql,sqlpara,function (err,result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
       res.render('index',{account_name:req.cookies.account_name,avatar_img:req.cookies.account_avatar,account_intro:req.body.account_intro,account_sex:req.body.sex});
    })
})

module.exports = router;
