var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
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
    var register_account={
        name:req.body.account_name,
        password:req.body.account_password
    }
    var  addSql = 'INSERT INTO user_info(account_name,account_password,avatar_url) VALUES(?,?,?)';
    var  addSqlParams = [register_account.name,register_account.password,"origin.jpg"];
    connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
    });
    res.render("login");

});

module.exports = router;