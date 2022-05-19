let citiesJson
let apiKey = '817360166e758a4c1d57e0d50b0c6ba6'

fetch('./cityList.json')
.then(response => response.json())
.then(json => {citiesJson = json})

function showCities() {
    while (document.querySelector('.cityList')) {document.querySelector('.cityListContainer').removeChild(document.querySelector('.cityListContainer').firstChild)} //remove all elements from dropdown city list 
    document.querySelector('.cityListContainer').style.display = 'none'                                                                                             //and hidden their container
    if (document.querySelector('.cityNameInput').value.length >= 1) {
        citiesJson.forEach(elem => {
            if (elem.name.toLowerCase().startsWith(document.querySelector('.cityNameInput').value)) {
                document.querySelector('.cityListContainer').style.display = 'block'                                                                                //show new city list basement on input
                document.querySelector('.cityListContainer').insertAdjacentHTML('afterbegin', `<div class="cityList" id="${elem.id}" onclick="getForecast(${elem.id})">
                                                                                                    <div>${elem.name}</div>
                                                                                                    <div class="country">${elem.country}</div
                                                                                                ></div>`)
            }
        })
    }
}

function getForecast(id) {
    while (document.querySelector('.cityList')) {document.querySelector('.cityListContainer').removeChild(document.querySelector('.cityListContainer').firstChild)} //remove all elements from dropdown city list 
    document.querySelector('.cityListContainer').style.display = 'none'                                                                                             //and hidden their container

    let lat
    let lon
    let name

    citiesJson.forEach(elem => {            //get coordinates of choosed cyty from cityList.json for API request
        if ((elem.id === id)) {
            lat = elem.coord.lat
            lon = elem.coord.lon
            name = elem.name
        }
    })
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,hourly,minutely&units=metric&lang=ru&appid=${apiKey}`) //API request
    .then(response => response.json())
    .then(json => showCurrentWeather(json, name))
}

function showCurrentWeather(json, name) {
    console.log(json)
    document.querySelector('.cityNameInput').value = ''         //clear input field
    while (document.querySelector('.currentWeather').firstChild) {document.querySelector('.currentWeather').removeChild(document.querySelector('.currentWeather').firstChild)}    //remvoe all child elements from currentWeather div
    
    document.querySelector('.currentWeather').style.display = 'grid'    //show currentWeather block and then add content to it
    document.querySelector('.currentWeather').insertAdjacentHTML('afterbegin', `<div class="currentCityName">${name}, ${fixTime((json.current.dt + json.timezone_offset) * 1000)}</div>
                                                                                <div class="currentTemperature">${Math.round(json.current.temp)}&#xb0;</div>
                                                                                
                                                                                <div class="currentClouds"><img src="./img/weather_icons/${json.current.weather[0].icon}.svg"></div>
                                                                                <div class="currentCloudsDescription">${json.current.weather[0].description}</div>
                                                                                <div class="currentFeel">Ощущается как ${Math.round(json.current.feels_like)}&#xb0;</div>
                                                                                <div class="sunriseData">Восход<br>${fixTime((json.current.sunrise + json.timezone_offset) * 1000)}</div>
                                                                                <div class="sunsetData">Закат<br>${fixTime((json.current.sunset + json.timezone_offset) * 1000)}</div>
                                                                                <div class="sunriseImg"><img src="./img/weather_icons/sunrise.svg"></div>
                                                                                <div class="sunsetImg"><img src="./img/weather_icons/sunset.svg"></div>
                                                                                <div class="humidityData">${json.current.humidity}%</div>
                                                                                <div class="UvIndexData">${json.current.uvi}</div>
                                                                                <div class="currentWindDirectionData">${fixWindDirection(json.current.wind_deg)}, ${json.current.wind_deg}</div>
                                                                                <div class="currentWindData">${json.current.wind_speed.toFixed(1)} м/с</div>
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
    for (let i=7; i >= 0; i--) {
        const weekDays = {      //days of week by number
            0:'Воскресенье',
            1:'Понедельник',
            2:'Вторник',
            3:'Среда',
            4:'Четверг',
            5:'Пятница',
            6:'Суббота'
        }
        const month = {         //month of year by number
            0:'Января',
            1:'Февраля',
            2:'Марта',
            3:'Апреля',
            4:'Мая',
            5:'Июня',
            6:'Июля',
            7:'Августа',
            8:'Сентября',
            9:'Октября',
            10:'Ноября',
            11:'Декабря',
        }

        let dailyDate = `${new Date((json.daily[i].dt + json.timezone_offset) * 1000).getUTCDate()} ${month[new Date((json.daily[i].dt + json.timezone_offset) * 1000).getUTCMonth()]}` // date fo every card
        let dayOfWeek
        i === 0 ? dayOfWeek = 'Сегодня' : dayOfWeek = weekDays[new Date((json.daily[i].dt + json.timezone_offset) * 1000).getUTCDay()]  //day of week for every card
        
        document.querySelector('.dailyWeather').style.display = 'flex'  //show dailyweather block and then add content to it
        document.querySelector('.dailyWeather').insertAdjacentHTML('afterbegin', `<div class="dailyCard">
                                                                                        <div class="dailyDate">${dayOfWeek}<br>${dailyDate}</div>
                                                                                        <div class="dailyImg"><img src="./img/weather_icons/${json.daily[i].weather[0].icon}.svg"></div>
                                                                                        <div class="dayTemp">${Math.round(json.daily[i].temp.max)}&#xb0;</div>
                                                                                        <div class="nightTemp">${Math.round(json.daily[i].temp.min)}&#xb0;</div>
                                                                                        <div class="dailyWindImg"><img src="./img/weather_icons/wind.svg"></div>
                                                                                        <div class="dailyHumidityImg"><img src="./img/weather_icons/humidity.svg"></div>
                                                                                        <div class="dailyPressureImg"><img src="./img/weather_icons/preasure.svg"></div>
                                                                                        <div class="dailyWindDesctiption">${json.daily[i].wind_speed.toFixed(1)}<br>m/с</div>
                                                                                        <div class="dailyHumidityDescription">${json.daily[i].humidity}<br>%</div>
                                                                                        <div class="dailyPressureDecription">${json.daily[i].pressure}<br>hPA</div>
                                                                                    </div>`)
    }
}
function fixTime(time) {        //fixing time from 5:2 to 05:02 for example
    let hours = new Date(time).getUTCHours()
    let minutes = new Date(time).getUTCMinutes()
    
    if (hours <= 9) {hours = '0' + hours}
    if (minutes <= 9) {minutes = '0' + minutes}

    return `${hours}:${minutes}`
}
function fixWindDirection(wd) {
    if (wd < 22.5 && wd > 337.5) {
        return ('Ю')
    } else if (wd > 22.5 && wd <= 67.5) {
        return ('ЮЗ')
    } else if (wd > 67.5 && wd <= 112.5) {
        return ('З')
    } else if (wd > 112.5 && wd <= 157.5) {
        return ('СЗ')
    } else if (wd > 157.5 && wd <= 202.5) {
        return ('С')
    } else if (wd > 202.5 && wd <= 247.5) {
        return ('СВ')
    } else if (wd > 227.5 && wd <= 292.5) {
        return ('В')
    } else if (wd > 292.5 && wd <= 337.5) {
        return ('ЮВ')
    }
}