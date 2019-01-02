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

router.get('/', function(req, res, next) {
    var sql='SELECT new_title,new_content,new_createDate FROM tb_news WHERE account_id=? ORDER BY new_createDate';
    var sqlpara=req.cookies.account_id;
    connection.query(sql,sqlpara,function (err,result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        res.render('personal',{result:result});
    })
});

module.exports = router;
