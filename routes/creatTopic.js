var express = require('express');
var router = express.Router();
var cookies=require('cookie-parser');
var async=require('async');
router.use(cookies());

var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'webapp'
});
var formidable = require('formidable');
var fs = require('fs');
connection.connect();
var glostr;
var glo;
router.post('/pic',  function(req, res) {
    var present="C:\\Users\\王铭\\WebstormProjects\\webapp\\public\\topic_images\\"
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, function(err, fields, files) {
        console.log('he');
        if (err) {
            res.locals.error = err;
            res.send("err");
            return;
        }

        var extName = '';  //后缀名
        console.log("files.fulAvatar.type="+files.topicpicupload.type);
        switch (files.topicpicupload.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if(extName.length !== 0){

            var avatarName = Math.random() + '.' + extName;
            var newPath = present + avatarName;
            console.log(newPath);
            console.log(files.topicpicupload.path);
            fs.writeFileSync(newPath,"none",function (err) {
                if(err){
                    throw err;
                }
                return;
            });
            console.log(files.topicpicupload.path)
            fs.renameSync(files.topicpicupload.path, newPath);  //重命名
            var  addSql = 'UPDATE tb_news SET new_picture = ? WHERE new_title = ?';
            var  addpara= [avatarName,glo];
            connection.query(addSql,addpara,function (err, result) {
                if(err){
                    console.log('[INSERT ERROR] - ',err.message);
                    return;
                }
            });
        }

        var searsql='SELECT new_id FROM tb_news WHERE new_title = ?';
        var searpara=glo;
        connection.query(searsql,searpara,function (err,result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }
            glostr=result[0].new_id;
            var lsql='INSERT INTO tb_comments(new_id,account_id) VALUES(?,?)'
            var lpara=[glostr,req.cookies.account_id];
            connection.query(lsql,lpara,function (err,result) {
                if(err){
                    console.log('[INSERT ERROR] - ',err.message);
                    return;
                }
                res.redirect('/showTopic');
            })
        });



    });

});

router.post('/body', function(req, res, next) {
    glo=req.body.title;
    var Sql='INSERT INTO tb_news(account_id,new_title,new_content) VALUES(?,?,?)';
    var para=[req.cookies.account_id,req.body.title,req.body.message];
    connection.query(Sql,para,function (err,result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.send('ok');
    })


});

router.get('/',function (req,res,next) {
    res.render('creatTopic');
})
module.exports = router;