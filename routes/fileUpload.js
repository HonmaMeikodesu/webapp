var express = require('express');
var router = express.Router();
var cookies=require('cookie-parser');
router.use(cookies());
var formidable = require('formidable');
var fs = require('fs');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'webapp'
});

connection.connect();


router.post('/avatar',  function(req, res) {
    var present="C:\\Users\\王铭\\WebstormProjects\\webapp\\public\\images\\"
    var delmql="SELECT avatar_url FROM user_info WHERE account_name=?";
    var delmqlpara=req.cookies.account_name;
    connection.query(delmql,delmqlpara,function (err,result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        if(result[0].avatar_url!=="origin.jpg"){
            fs.unlink(present+result[0].avatar_url,function (err2) {
                if(err2){
                    throw err2;
                }
            })
        }
    })
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, function(err, fields, files) {
        console.log("hll");
        if (err) {
            res.locals.error = err;
            res.send("err");
            return;
        }

        var extName = '';  //后缀名
        console.log("files.fulAvatar.type="+files.avatar_upload.type);
        switch (files.avatar_upload.type) {
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

        if(extName.length === 0){
            res.locals.error = '只支持png和jpg格式图片';
            res.send("err");
            return;
        }

        var avatarName = Math.random() + '.' + extName;
        var newPath = present + avatarName;
        console.log(newPath);
        console.log(files.avatar_upload.path);
        fs.writeFileSync(newPath,"none",function (err) {
            if(err){
                throw err;
            }
            return;
        });
        console.log(files.avatar_upload.path)
        fs.renameSync(files.avatar_upload.path, newPath);  //重命名

        var  addSql = 'UPDATE user_info SET avatar_url = ? WHERE account_name=?';
        var  addpara= [avatarName,req.cookies.account_name];
        connection.query(addSql,addpara,function (err, result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }
        });
        res.cookie("account_avatar","/images/"+avatarName,{maxAge:40000,httpOnly:true});
        res.send("ok!");
    });
    return;
});

module.exports = router;