let pages = document.getElementsByClassName('pages');
let welcomeMsg = document.querySelector('.welcome-msg');
let home = document.querySelector('#home');
let hourlyWeather = document.querySelector('#hourly-weather');
let about = document.querySelector('#about');
let homePage = document.querySelector('#home-page');
let hourlyWeatherPage = document.querySelector('#hourly-weather-page');
let aboutPage = document.querySelector('#about-page');


for (let i = 1; i < pages.length; i++) {
    pages[i].style.display = 'none';
}

home.addEventListener('click', () => {
    homePage.style.display = 'block';
    hourlyWeatherPage.style.display = 'none';
    aboutPage.style.display = 'none';
})

hourlyWeather.addEventListener('click', () => {
    hourlyWeatherPage.style.display = 'block';
    aboutPage.style.display = 'none';
    homePage.style.display = 'none';

})

about.addEventListener('click', () => {
    aboutPage.style.display = 'block';
    hourlyWeatherPage.style.display = 'none';
    homePage.style.display = 'none';
})

async function getWeatherStatistics(city) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=41f14ef8a5c3cb4101da73fc81385f7a`);
        let weatherStatistic = await response.json()
        console.log(weatherStatistic)

        showStatistics(weatherStatistic)
        showHourlyWeather(weatherStatistic)

    } catch {

    }
}

function calculateMax(weatherStatistic, maxOf){
    Math.max(...weatherStatistic.list.map(function (obj) {
        return obj.main.maxOf;
    }));
}

function calculateMin(weatherStatistic, minOf){
   let min = Math.min(...weatherStatistic.list.map(function (obj) {
        return obj.main.minOf;
    }));

    console.log(min);

}


function showStatistics(weatherStatistic) {
    let cityName = document.querySelector('#cityName')
                            .innerHTML = weatherStatistic.city.name;

    //let maxTemp = calculateMax(weatherStatistic, 'temp');

    let maxTemp = Math.max(...weatherStatistic.list.map(function (obj) {
        return obj.main.temp;
    }));

    //let minTemp = calculateMin(weatherStatistic, 'temp');
    
    let minTemp = Math.min(...weatherStatistic.list.map(function (obj) {
        return obj.main.temp;                
    }));

    let averageTemp = weatherStatistic.list.reduce((total, currentValue) => total + currentValue.main.temp, 0) / weatherStatistic.list.length;

   // console.log(Math.round(averageTemp));

    let temperature = document.querySelector('#temperature')
                              .innerHTML = `${maxTemp + '&#8451'};
                                           ${Math.round(averageTemp) + '&#8451'}
                                           ${minTemp + '&#8451'}`;


    let maxHum = Math.max(...weatherStatistic.list.map(function (obj) {
        return obj.main.humidity;
    }));

    let minHum = Math.min(...weatherStatistic.list.map(function (obj) {
        return obj.main.humidity;
    }));

    let averageHum = weatherStatistic.list.reduce((total, currentValue) => total + currentValue.main.humidity, 0) / weatherStatistic.list.length;


    let humidity = document.querySelector('#humidity')
                            .innerHTML = `${maxHum + '%'}
                                          ${Math.round(averageHum) + '%'}
                                          ${minHum + '%'}`;

}

getWeatherStatistics('skopje')

let searchBtn = document.querySelector('#search-btn')
    .addEventListener('click', () => {
        city = document.querySelector('#search-city').value;
        getWeatherStatistics(city)
    });





function showHourlyWeather(weatherStatistics) {
    let tbody = document.querySelector('#tbody');
    for (let i = 0; i < weatherStatistics.list.length; i++) {
        let tr = document.createElement('tr')
        tbody.appendChild(tr);

        let tdTime = document.createElement('td');
        tr.appendChild(tdTime);
        tdTime.innerHTML = new Date(weatherStatistics.list[i].dt * 1000).toLocaleString('en-GB');

        let tdDes = document.createElement('td');
        tr.appendChild(tdDes);
        tdDes.innerHTML = weatherStatistics.list[i].weather[0].description;

        let tdImg = document.createElement('td');
        tr.appendChild(tdImg)
        let img = document.createElement('img');
        img.src = `http://openweathermap.org/img/w/${weatherStatistics.list[i].weather[0].icon}.png`;
        tdImg.appendChild(img)

        let tdTemp = document.createElement('td');
        tr.appendChild(tdTemp);
        tdTemp.innerHTML = weatherStatistics.list[i].main.temp + '&#8451';

        let tdWind = document.createElement('td');
        tr.appendChild(tdWind);
        tdWind.innerHTML = weatherStatistics.list[i].wind.speed + 'mph ';

        let tdHum = document.createElement('td');
        tr.appendChild(tdHum);
        tdHum.innerHTML = weatherStatistics.list[i].main.humidity + '%';

    }
}

getWeatherStatistics('skopje');
