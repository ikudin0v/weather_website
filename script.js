let citiesJson
let apiKey = '817360166e758a4c1d57e0d50b0c6ba6'

fetch('./cityList.json')
.then(response => response.json())
.then(json => {
    citiesJson = json
})

function showLog() {
    let i = 0

    while (document.querySelector('.cityList')){
        document.querySelector('.cityListContainer').removeChild(document.querySelector('.cityListContainer').firstChild)
    }
    document.querySelector('.cityListContainer').style.display = 'none'
    if (document.querySelector('.cityNameInput').value.length >= 1){

        citiesJson.forEach(elem => {
            if ((elem.name.toLowerCase().startsWith(document.querySelector('.cityNameInput').value) && i < 10)){
                document.querySelector('.cityListContainer').style.display = 'block'
                document.querySelector('.cityListContainer').insertAdjacentHTML('afterbegin', `<div class="cityList" id="${elem.id}" onclick="getForecast(${elem.id})">
                                                                                                    <div>${elem.name}</div>
                                                                                                    <div class="country">${elem.country}</div
                                                                                                ></div>`)

            }
        })
    }
}

function getForecast(id) {
    while (document.querySelector('.cityList')){
        document.querySelector('.cityListContainer').removeChild(document.querySelector('.cityListContainer').firstChild)
    }
    document.querySelector('.cityListContainer').style.display = 'none'
    let lat
    let lon
    let name
    citiesJson.forEach(elem => {
        if ((elem.id === id)){
            lat = elem.coord.lat
            lon = elem.coord.lon
            name = elem.name
        }
    })
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,hourly,minutely&units=metric&lang=ru&appid=${apiKey}`)
    .then(response => response.json())
    .then(json => showCurrentWeather(json, name))
}

function showCurrentWeather(json, name) {
    console.log(json)

    document.querySelector('.cityNameInput').value = ''
    while (document.querySelector('.currentWeather').firstChild){
        document.querySelector('.currentWeather').removeChild(document.querySelector('.currentWeather').firstChild)
    }
    let timeZone = new Date()
    console.log(timeZone.getTimezoneOffset() * 60)
    let sunriseTime = new Date((json.current.sunrise + json.timezone_offset) * 1000)
    let sunsetTime = new Date((json.current.sunset + json.timezone_offset) * 1000)
    let currentTime = new Date((json.current.dt + timeZone.getTimezoneOffset() * 60 + json.timezone_offset) * 1000)
    document.querySelector('.currentWeather').insertAdjacentHTML('afterbegin', `<div class="currentCityName">${name}, ${currentTime.getHours()}:${currentTime.getMinutes()}</div>
                                                                                <div class="currentTemperature">${Math.round(json.current.temp)}&#xb0;</div>
                                                                                
                                                                                <div class="currentClouds"><img src="./img/weather_icons/${json.current.weather[0].icon}.svg"></div>
                                                                                <div class="currentCloudsDescription">${json.current.weather[0].description}</div>
                                                                                <div class="currentFeel">Ощущается как ${Math.round(json.current.feels_like)}&#xb0;</div>
                                                                                <div class="sunriseData">Восход<br>${sunriseTime.getUTCHours()}:${sunriseTime.getMinutes()}</div>
                                                                                <div class="sunsetData">Закат<br>${sunsetTime.getUTCHours()}:${sunsetTime.getMinutes()}</div>
                                                                                <div class="sunriseImg"><img src="./img/weather_icons/sunrise.svg"></div>
                                                                                <div class="sunsetImg"><img src="./img/weather_icons/sunset.svg"></div>
                                                                                <div class="humidityData">${json.current.humidity}%</div>
                                                                                <div class="UvIndexData">${json.current.uvi}</div>
                                                                                <div class="currentWindDirectionData">${json.current.wind_deg}</div>
                                                                                <div class="currentWindData">${json.current.wind_speed} м/с</div>
                                                                                <div class="currentWindImg"><img src="./img/weather_icons/wind.svg"></div>
                                                                                <div class="currentWindDirectionImg"><img src="./img/weather_icons/wind_direction.svg"></div>
                                                                                <div class="UvIndexImg"><img src="./img/weather_icons/uv.svg"></div>
                                                                                <div class="humidityImg"><img src="./img/weather_icons/humidity.svg"></div>
                                                                                <div class="currentWindDirection">Направление ветра</div>
                                                                                <div class="currentUvIndex">УФ-индекс</div>
                                                                                <div class="currentWindSpeed">Скорость ветра</div>
                                                                                <div class="currentHumidity">Влажность</div>
                                                                                <div class="currentPreasure">Давление</div>
                                                                                <div class="preasureImg"><img src="./img/weather_icons/preasure.svg"></div>
                                                                                <div class="currentPreasureData">${json.current.pressure} hPa</div>`)
          
    showDailyWeather(json)                                                                            

}


function showDailyWeather(json) {
    for (i=0; i < 8; i++){
        document.querySelector('.dailyWeather').insertAdjacentHTML('afterbegin', `<div class="dailyCard">
                                                                                        <div class="dailyDate">Среда<br>20.02</div>
                                                                                        <div class="dailyImg"><img src="./img/weather_icons/01d.svg"></div>
                                                                                        <div class="dayTemp">20&#xb0;</div>
                                                                                        <div class="nightTemp">15&#xb0;</div>
                                                                                        <div class="dailyWindImg"><img src="./img/weather_icons/wind.svg"></div>
                                                                                        <div class="dailyHumidityImg"><img src="./img/weather_icons/humidity.svg"></div>
                                                                                        <div class="dailyPressureImg"><img src="./img/weather_icons/preasure.svg"></div>
                                                                                        <div class="dailyWindDesctiption">20<br>m/с</div>
                                                                                        <div class="dailyHumidityDescription">50<br>%</div>
                                                                                        <div class="dailyPressureDecription">1050<br>hPA</div>
                                                                                    </div>`)
    }
}