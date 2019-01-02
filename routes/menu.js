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
    var sql='SELECT * FROM tb_menus';
    connection.query(sql,function (err,result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        res.render('menu',{result:result});
    })
});

module.exports = router;