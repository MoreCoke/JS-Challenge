var timetable = document.querySelector(".timetable");
function showData() {
    var country = [];
    var xhr = new XMLHttpRequest();
    const url = "./country.json";
    xhr.open("get", url);
    xhr.onload = function () {
        if (xhr.status === 200) {
            country = JSON.parse(xhr.response).data;
            //foreach設定各國的new Date物件後，再製作模板
            function setTemp() {
                var setting = { day: 'numeric', month: 'short', year: 'numeric', hour12: false, minute: 'numeric', hour: 'numeric' };
                var str = '';
                var temp = function (element) {
                    var option = { timeZone: element.timeZone, ...setting };
                    var arr = new Date().toLocaleDateString('en-GB', option).split(" ");
                    var currentDay = arr.slice(0, 3);//取 arr 中日期的部分
                    currentDay.splice(1, 0, " "); //刪除空格
                    currentDay.splice(3, 0, "."); //加入點點
                    var date = currentDay.join("").replace(/\,/g, "");
                    var time = arr.slice(3).join('');
                    str += `
            <div class="d-flex justify-content-between align-items-center px-4 py-3">
                <div>
                    <h2>${element.city}</h2>
                    <span>${date}</span>
                </div>
                <div class="time">${time}</div>
            </div>
            `
                }
                country.forEach(temp);
                return str;
            };
            timetable.innerHTML = setTemp();
        } else {
            console.log("error");
        }
    }
    xhr.send();
};
setInterval(showData, 1000);