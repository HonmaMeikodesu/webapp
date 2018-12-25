var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookies=require('cookie-parser');
router.use(cookies());
router.use(bodyParser.urlencoded({ extended: false }));
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'webapp'
});

connection.connect();


router.post('/', function(req, res, next) {

    var  sql = 'SELECT account_name FROM user_info';
    connection.query(sql,function (err, result) {
        var indi=true;
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        };
        console.log(result);
        for(var i in result){
            if(result[i].account_name===req.body.account_name){
                indi=false;
                break;
            }
        }
        if(indi){
            res.send("账号不存在！");
        }else {
            next();
        }
        });
});

router.post('/',function (req,res) {
    var sql1 = 'SELECT account_password FROM user_info WHERE account_name=?';
    var sqlpara=req.body.account_name;
    connection.query(sql1,sqlpara, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

            if (result[0].account_password !== req.body.account_password) {
                res.send("密码错误！");
            }else {
                res.cookie("account_name", req.body.account_name, {maxAge: 20000, httpOnly: true});
                res.cookie("account_password", req.body.account_password, {maxAge: 20000, httpOnly: true});
                res.render("index", {account_name: req.body.account_name});
            }
    });
});







module.exports = router;
