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

router.post('/', function(req, res, next) {
    var sql='INSERT INTO tb_comments(account_id,new_id,comment_content) VALUES(?,?,?)';
    var sqlpara=[req.cookies.account_id,req.body.new_id,req.body.comment_content];
    connection.query(sql,sqlpara,function (err,result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.send('ok');
    })
});

module.exports = router;
