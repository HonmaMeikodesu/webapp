function signin(){
    document.getElementById('loginform').style.display='none';
    document.getElementById('signinInfo').style.display='inline';
}

function login(){
    document.getElementById('signinInfo').style.display='none';
    document.getElementById('loginform').style.display='inline';
}
$(document).ready(function () {
    $("#name").blur(function () {
        var str=$("#name").val();
        $.get("/validator?name="+str,function (data,status) {
            if(data==="true"){
                $("#name_detect").html("用户名无重复");
            }else{
                $("#name_detect").html("用户名重复,请修改");
            }
        })
    })
})