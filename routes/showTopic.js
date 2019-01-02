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
var sender;
var owner;
router.get('/', function(req, res, next) {
    var sql='SELECT * FROM tb_news,tb_comments,user_info WHERE tb_news.new_id = tb_comments.new_id and tb_comments.account_id=user_info.account_id ORDER BY tb_news.new_id,comment_creatTime';
    connection.query(sql,function (err,result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        sender=result;
    });
    var sql1='SELECT * FROM tb_news,tb_comments,user_info WHERE tb_news.new_id = tb_comments.new_id and tb_news.account_id=user_info.account_id ORDER BY tb_news.new_id';
    connection.query(sql1,function (err,result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        owner=result;
        console.log(owner);
        res.render('Topic',{sender:sender,owner:owner,account_name:req.cookies.account_name});
    });
});

module.exports = router;