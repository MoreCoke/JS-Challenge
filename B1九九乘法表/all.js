var wrapper = document.querySelector(".wrapper");
var box="";
for (let i =2;i<=9;i++){
    var str="";
    str+=`<h2>${i}</h2>`
    for(let j =1;j<=9;j++){
        str+=`<span>${i} × ${j} ＝ ${i*j}</span>`
    }
    box+=`<div class="box">${str}</div>`;
}
wrapper.innerHTML += box;