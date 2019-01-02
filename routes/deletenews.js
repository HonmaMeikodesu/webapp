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
    var sql1='DELETE FROM tb_comments WHERE new_id=?'
    var sqlpara=parseInt(req.body.new_id);
    connection.query(sql1,sqlpara,function (err,result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        var sql2='DELETE FROM tb_news WHERE new_id=?';
        connection.query(sql2,sqlpara,function (err,result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            res.redirect('/showTopic');
        })
    })
});

module.exports = router;