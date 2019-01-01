var url=' https://www.easy-mock.com/mock/5b616dab0f34b755cbc58b91/dai/menu';
window.onload=function (){
    var xhr=new XMLHttpRequest();
    var data;
    xhr.open("POST", url, true);
    xhr.send();
    xhr.onreadystatechange=function () {
        if(xhr.readyState === 4){
            if((xhr.status>=200 && xhr.status<300) || xhr.status === 304){
                data=JSON.parse(xhr.responseText);
                //动态向HTML页面中插入数据
                var Ohref=location.href;
                var n1 = Ohref.length;//地址的总长度
                var n2 = Ohref.indexOf("=");//取得=号的位置
                var id = decodeURI(Ohref.substr(n2+1, n1-n2));//从=号后面的内容
                //console.log(data.menu[id]);
                var h1 = document.createElement('h1');
                var a = document.createElement('a');
                var ul = document.createElement('ul');
                a.innerHTML = data.menu[id].name;
                a.id="recipe_title";
                h1.className='recipe_De_title';
                h1.appendChild(a);
                document.getElementById('top').appendChild(h1);
                document.getElementById("block_txt1").innerHTML='<span class="txt_tart">“</span>'+data.menu[id].describe+'<span class="txt_end">” </span>';
                var i;
                for(i=0;i<data.menu[id].type.length;i++){
                    var b = document.createElement('b');
                    var li1 = document.createElement("li");
                    var span1 = document.createElement('span');
                    var span2 = document.createElement('span');
                    b.innerHTML=data.menu[id].type[i].description;
                    span2.innerHTML=data.menu[id].type[i].quantity;
                    span1.className="category_s1";
                    span2.className="category_s2";
                    span1.appendChild(b);
                    li1.appendChild(span1);
                    li1.appendChild(span2);
                    console.log(li1);
                    ul.appendChild(li1);
                }
                document.getElementById("material").appendChild(ul);
                for(i=0;i<data.menu[id].step.length;i++){
                    var li2 = document.createElement("li");
                    var div = document.createElement("div");
                    div.innerHTML=data.menu[id].step[i];
                    div.className='recipeStep_word';
                    div.style='width: 95%';
                    li2.appendChild(div);
                    document.getElementById('step').appendChild(li2);
                    console.log(li2);
                }
                //document.getElementById("material").appendChild(li1);
                //document.getElementById('step').appendChild(li2);
            }else{
                alert("unsuccessful "+xhr.status)
            }
        }
    }
};
