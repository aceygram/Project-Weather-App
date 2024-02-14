
async function getWeatherData() {
    let link = await fetch(
        'http://api.weatherapi.com/v1/current.json?key=21a7ef1547554808898142201241402&q=Ibadan&aqi=yes', {
        mode: 'cors',
        },
    );
    try {
        if (link.status === 200){
            // console.log(link.json());
            return  link.json();
        }
    } catch (err) {
        console.log(err)
    }
    return link;
}

function getCondition(weatherData) {
    let condition = weatherData.current.condition.text;
    let icon = weatherData.current.condition.icon;
    console.log(icon);
    console.log(condition);
}

function getLocation(weatherData) {
    let location = weatherData.location.name;
    let region = weatherData.location.region;
    let country = weatherData.location.country;
    console.log(location);
    console.log(region);
    console.log(country);
}

function getDate(weatherData){
    let time = weatherData.location.localtime;
    time = convertDateFormat(time);
    console.log(time);
}

function getDegreeCelcius(weatherData){
    let degreeCelcius = weatherData.current.temp_c;
    degreeCelcius = `${degreeCelcius}°C`;
    console.log(degreeCelcius);
}

function getFeelsLikeC(weatherData){
    let degreeCelcius = weatherData.current.feelslike_c;
    degreeCelcius = `Feels like ${degreeCelcius}°C`;
    console.log(degreeCelcius);
}

function getWindData(weatherData){
    let windMph = weatherData.current.wind_mph;
    let windDegree = weatherData.current.wind_degree;
    let windDir = weatherData.current.wind_dir;

    windMph = `${windMph}m/h`;
    windDegree = `${windDegree}°`;


    console.log(windMph);
    console.log(windDegree);
    console.log(windDir);
}

function getHumidity(weatherData){
    let humidity = weatherData.current.humidity;
    humidity = `${humidity}%`;
    console.log(humidity);
}

function getPrecip(weatherData){
    let precip = weatherData.current.precip_in;
    precip = `${precip} in`;
    console.log(precip);
}

function getPressure(weatherData){
    let pressure = weatherData.current.pressure_in;
    pressure = `${pressure} in`;
    console.log(pressure);
}

function getUV(weatherData){
    let UV = weatherData.current.uv;
    console.log(UV);
}

function getVisibility(weatherData){
    let visibility = weatherData.current.pressure_in;
    visibility = `${visibility} km`;
    console.log(visibility);
}

getWeatherData()
.then(value => {
    getCondition(value)
    getLocation(value)
    getDate(value)
    getDegreeCelcius(value)
    getFeelsLikeC(value)
    getWindData(value)
    getHumidity(value)
    getPrecip(value)
    getPressure(value)
    getUV(value)
    getVisibility(value)
}).catch((err) => {
    console.log(err)
})



function convertDateFormat(dateStr) {
    const inputDate = new Date(dateStr);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const dayOfWeek = days[inputDate.getDay()];
    const dayOfMonth = inputDate.getDate();
    const month = months[inputDate.getMonth()];
    const year = inputDate.getFullYear().toString().slice(-2);
    let hours = inputDate.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert midnight (0) to 12
    const minutes = inputDate.getMinutes();
  
    const formattedDate = `${dayOfWeek}, ${dayOfMonth}th ${month} '${year} ${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    return formattedDate;
}
  
