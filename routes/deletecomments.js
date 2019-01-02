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
    var sql='DELETE FROM tb_comments WHERE comment_id=?'
    var sqlpara=parseInt(req.body.comment_id);
    connection.query(sql,sqlpara,function (err,result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        res.redirect('/showTopic');
    })
});

module.exports = router;