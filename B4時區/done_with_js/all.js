var timetable = document.querySelector(".timetable");
var country = [
    {
        city: 'NEW YORK',
        timeZone: 'America/New_York',
    },
    {
        city: 'LONDON',
        timeZone: 'Europe/London',
    },
    {
        city: 'BANGKOK',
        timeZone: 'Asia/Bangkok',
    },
    {
        city: 'TAIWAN',
        timeZone: 'Asia/Taipei',
    },
    {
        city: 'SYDNEY',
        timeZone: 'Australia/Sydney',
    },
];

function getData() {
    var setting = { day: 'numeric', month: 'short', year: 'numeric', hour12: false, minute: 'numeric', hour: 'numeric' };
    var str = '';
    country.forEach(function (element) {
        var option = { timeZone: element.timeZone, ...setting };
        var arr = new Date().toLocaleDateString('en-GB', option).split(" ");
        var currentDay = arr.slice(0, 3).splice(1, 0, " ").splice(3, 0, ".");//取arr中日期的值
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
    });
    return str;
};

function showData() {
    timetable.innerHTML = getData();
};

setInterval(showData,1000);