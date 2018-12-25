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

router.get('/', function(req, res, next) {
    console.log("hello")
    var sql = 'SELECT account_name FROM user_info';
    connection.query(sql, function (err, result) {
        var indi = true;
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        ;
        for (var i in result) {
            if (result[i].account_name === req.query.name) {
                indi = false;
                break;
            }
        }

        if (indi) {
            res.send("true");
        } else {
            res.send("false");
        }
    });
});

module.exports = router;