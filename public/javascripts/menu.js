var url=' https://www.easy-mock.com/mock/5b616dab0f34b755cbc58b91/dai/menu';
var main=[];
var imgs=[];
window.onload=function(){
    var xhr=new XMLHttpRequest();
    var data;
    xhr.open("POST", url, true);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if((xhr.status>=200 && xhr.status<300) || xhr.status === 304){
                data=JSON.parse(xhr.responseText);
                //动态向HTML页面中插入数据
                for(var i=0;i<data.menu.length;i++){
                    var li=document.createElement('li');
                    var div1 = document.createElement('div');
                    var div2 = document.createElement('div');
                    var a1 = document.createElement('a');
                    var img = document.createElement('img');
                    var h2 = document.createElement('h2');
                    var p = document.createElement('p');
                    div1.className = 'pic';
                    div2.className = 'detail';
                    img.src=data.menu[i].imgUrl;
                    img.width='180';
                    img.height='180';
                    imgs.push(img);
                    imgs[i].index=i;
                    imgs[i].onclick=function(){
                        window.location.href='detail.html?number='+this.index;
                    };
                    div1.appendChild(img);
                    a1.innerHTML = data.menu[i].name;
                    p.className = "subcontent";
                    for(var j=0;j<data.menu[i].type.length;j++){
                        console.log(data.menu[i].type[j].description);
                        p.innerHTML = p.innerHTML + '  '+data.menu[i].type[j].description;
                    }
                    h2.appendChild(a1);
                    div2.appendChild(h2);
                    div2.appendChild(p);
                    li.appendChild(div1);
                    li.appendChild(div2);
                    document.getElementById("menu").appendChild(li);
                }
            }else{
                alert("unsuccessful "+xhr.status)
            }
        }
    };
};

