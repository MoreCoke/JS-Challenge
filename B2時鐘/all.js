var clockHour = document.querySelector(".clock-hour");
var clockMinute = document.querySelector(".clock-minute");
var clockSecond = document.querySelector(".clock-second");
//IIFE練習
(function(){
    function runTime(){
        var dayObj = new Date();
        var second = dayObj.getSeconds();
        var minute = dayObj.getMinutes(); 
        var hour = dayObj.getHours();
        var hourMinute =dayObj.getMinutes()/2;   //每分鐘轉0.5度
        clockSecond.style = `transform: rotate(${second * 6+180}deg) translateX(-50%);` 
        clockMinute.style = `transform: rotate(${minute * 6+180}deg) translateX(-50%);`
        clockHour.style = `transform: rotate(${hour*30+hourMinute+180}deg) translateX(-50%);`  //一小時轉30度
    }
    setInterval(runTime,1000);
}());

//普通寫法

// setInterval(function () {
//     runSecond();
//     runMinute();
//     runHour();
// }, 1000);

// function runSecond() {
//     var dayObj = new Date();
//     var second = dayObj.getSeconds();
//     clockSecond.style = `transform: rotate(${second * 6+180}deg) translateX(-50%);`
// }
// function runMinute(){
//     var dayObj = new Date();
//     var minute = dayObj.getMinutes(); 
//     clockMinute.style = `transform: rotate(${minute * 6+180}deg) translateX(-50%);`
// }
// function runHour(){
//     var dayObj = new Date();
//     var hour = dayObj.getHours();
//     var minute =dayObj.getMinutes()/2;   //每分鐘轉0.5度
//     clockHour.style = `transform: rotate(${hour*30+minute+180}deg) translateX(-50%);`  //一小時轉30度
// }
