(function init() {
  const gas = 'https://script.google.com/macros/s/AKfycbyrfhVfFD8g6ww047z4IEJ4aGmNI9gDuxK9PVEBWOvj5h9SQgk/exec';
  const url = 'http://opendata2.epa.gov.tw/AQI.json';
  const aqiurl = gas + '?url=' + url;
  var defaultCounty = '臺北市';
  var countyDetail;
  var aqiData = [];
  var selectMenu = document.querySelector('.select-menu');
  var districtDetail = document.querySelector('.district-detail');
  var districtList = document.querySelector('.district-list');
  var title = document.querySelector('.title');
  var time = document.querySelector('.time');

  selectMenu.addEventListener('change', getCountyData);
  districtList.addEventListener('click', getDistrictDetail);

  function showSelectList() {
    var selectText = '<option disabled>請選擇地區</option>'
    var allCounty = aqiData.map(item => item.County).filter((item, index, self) => {
      return self.indexOf(item) === index;
    });
    for (let i = 0; i < allCounty.length; i++) {
      if (allCounty[i] === defaultCounty) {
        selectText += `<option value="${defaultCounty}" selected="selected">${defaultCounty}</option>`
      } else {
        selectText += `<option value="${allCounty[i]}">${allCounty[i]}</option>`
      }
    }
    selectMenu.innerHTML = selectText;
  }

  function getCountyData(e) {
    var currentCounty = e.target.value;
    countyDetail = aqiData.filter(item => item.County === currentCounty);
    showDistrictList(countyDetail);
    showDistrictDetail(countyDetail[0]);
  }

  function classifyAqiLevel(status) {
    switch (status) {
      case '良好':
        return 'good';
      case '普通':
        return 'normal';
      case '對敏感族群不健康':
        return 'sensitive';
      case '對所有族群不健康':
        return 'unhealth'
      case '非常不健康':
        return 'bad'
      case '危害':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  function showDistrictList(item) {
    var districtText = "";
    for (var i = 0; i < item.length; i++) {
      districtText +=
        `<div class="col-md-6 mb-3">
          <div class="aqi">
            <div class="aqi-district" data-district="${item[i].SiteName}">${item[i].SiteName}</div>
            <div class="aqi-index bg-${classifyAqiLevel(item[i].Status)}" data-district="${item[i].SiteName}">${item[i].AQI || '-'}</div>
          </div>
        </div>`
    }
    title.innerHTML = item[0].County;
    time.innerHTML = item[0].PublishTime;
    districtList.innerHTML = districtText;
  }
  function getDistrictDetail(e) {
    var currentDistrict = e.target.dataset.district;
    var currentDistrictData = countyDetail.filter(item => item.SiteName === currentDistrict)[0];
    if (typeof currentDistrict !== 'undefined') {
      showDistrictDetail(currentDistrictData);
    }
  }
  function showDistrictDetail(district) {
    var districtDetailText =
      `<div class="aqi">
        <div class="aqi-district">${district.SiteName}</div>
        <div class="aqi-index bg-${classifyAqiLevel(district.Status)}">${district.AQI}</div>
      </div>
      <ul class="aqi-data">
        <li><b>臭氧</b> <span>O3 (ppb)</span> <b class="ml-auto">${district.O3}</b></li>
        <li><b>懸浮微粒</b> <span>PM10 (μg/m³)</span> <b class="ml-auto">${district.PM10}</b></li>
        <li><b>細懸浮微粒</b> <span>PM2.5 (μg/m³)</span> <b class="ml-auto">${district['PM2.5']}</b></li>
        <li><b>一氧化碳</b> <span>CO (ppm)</span> <b class="ml-auto">${district.CO}</b></li>
        <li><b>二氧化硫</b> <span>SO2 (ppb)</span> <b class="ml-auto">${district.SO2}</b></li>
        <li><b>二氧化氮</b> <span>NO2 (ppb)</span> <b class="ml-auto">${district.NO2}</b></li>
      </ul>`
    districtDetail.innerHTML = districtDetailText;
  }
  fetch(aqiurl, { method: 'get' }).then(res => {
    return res.json();
  }).then(jsonData => {
    aqiData = [...jsonData];
    countyDetail = aqiData.filter(item => item.County === defaultCounty);
    showSelectList();
    showDistrictList(countyDetail);
    showDistrictDetail(countyDetail[0]);
  }).catch(err => {
    console.log('failure!! ', err);
  })
})();

