const input = document.querySelector("input");
const submit = document.querySelector(".submit");
const LocationField = document.querySelector('.location');
const mainTopLeft = document.querySelector('.top-left');
const mainTopRight = document.querySelector('.top-right');
const mainGrid = document.querySelector('.main-grid')



async function getWeatherData() {
    const { value } = input;
    let link = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=21a7ef1547554808898142201241402&q=${value}&aqi=yes`, {
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

async function getWeatherDataForIntialLoading() {
    let link = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=21a7ef1547554808898142201241402&q=lagos&aqi=yes`, {
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
    let icon = `https:${weatherData.current.condition.icon}`;
   
    handleIconDisplay(icon, 'weather-icon', mainTopLeft);
    handleDisplay(condition, 'condition', mainTopLeft);
}

function getLocation(weatherData) {
    let location = weatherData.location.name;
    let region = weatherData.location.region;
    let country = weatherData.location.country;
    let fullLocation;

    if(location === region) {
        fullLocation = `${location}, ${country}`;
    } else if (region === '') {
        fullLocation = `${location}, ${country}`;
    } else {
        fullLocation = `${location}, ${region}, ${country}`;
    }
    handleDisplay(fullLocation, 'fullLocation', LocationField);
}

function getDate(weatherData){
    let time = weatherData.location.localtime;
    time = convertDateFormat(time);
    handleDisplay(time, 'time', LocationField);
}

function getDegreeCelcius(weatherData){
    let degreeCelcius = weatherData.current.temp_c;
    degreeCelcius = `${degreeCelcius}°C`;
    handleDisplay(degreeCelcius, 'degreeCelcius', mainTopRight);
}

function getFeelsLikeC(weatherData){
    let degreeCelcius = weatherData.current.feelslike_c;
    degreeCelcius = `Feels like ${degreeCelcius}°C`;
    handleDisplay(degreeCelcius, 'feels-like', mainTopRight);
}

function getWindData(weatherData){
    let windMph = weatherData.current.wind_mph;
    let windDegree = weatherData.current.wind_degree;
    let windDir = weatherData.current.wind_dir;

    windMph = `${windMph}m/h`;
    windDegree = `${windDegree}°`;


    handleDisplayForGrid(windMph, mainGrid, 'Wind Speed');
    handleDisplayForGrid(windDegree, mainGrid, 'Wind Deg');
    handleDisplayForGrid(windDir, mainGrid, 'Wind Dir');
}

function getHumidity(weatherData){
    let humidity = weatherData.current.humidity;
    humidity = `${humidity}%`;
    handleDisplayForGrid(humidity, mainGrid, 'Humidity');
}

function getPrecip(weatherData){
    let precip = weatherData.current.precip_in;
    precip = `${precip} in`;
    handleDisplayForGrid(precip, mainGrid, 'Precipitation');

}

function getPressure(weatherData){
    let pressure = weatherData.current.pressure_in;
    pressure = `${pressure} in`;
    handleDisplayForGrid(pressure, mainGrid, 'Pressure');
}

function getUV(weatherData){
    let UV = weatherData.current.uv;
    handleDisplayForGrid(UV, mainGrid, 'UV');
}

function getVisibility(weatherData){
    let visibility = Math.round(weatherData.current.vis_km);
    visibility = `${visibility} km`;
    handleDisplayForGrid(visibility, mainGrid, 'Visibility');
}

function clearField() {
    LocationField.innerHTML = ' ';
    mainTopLeft.innerHTML = ' ';
    mainTopRight.innerHTML = ' '; 
    mainGrid.innerHTML = ' ';
}

function activateLoadingScreen() {
    showLoadingScreen();

    // Simulate an API request (replace this with your actual API request)
    setTimeout(function () {
      // After fetching data, hide the loading screen
      hideLoadingScreen();
    }, 1000); // Simulating a 2-second API request delay
}

function showLoadingScreen() {
    document.getElementById("loading-screen").style.display = "flex";
}

function hideLoadingScreen() {
    document.getElementById("loading-screen").style.display = "none";
}

function run(){
    activateLoadingScreen();
    clearField();
    getWeatherData()
    .then(value => {
        getLocation(value)
        getDate(value)
        getCondition(value)
        getDegreeCelcius(value)
        getFeelsLikeC(value)
        getWindData(value)
        getHumidity(value)
        getPrecip(value)
        getPressure(value)
        getUV(value)
        getVisibility(value)
        input.setAttribute('placeholder', 'Search City...');
        input.value = '';
    })
    .catch((err) => {
        console.log(err)
        showErr();
    })
}

function runInitialLoading(){
    activateLoadingScreen();
    clearField();
    getWeatherDataForIntialLoading()
    .then(value => {
        getLocation(value)
        getDate(value)
        getCondition(value)
        getDegreeCelcius(value)
        getFeelsLikeC(value)
        getWindData(value)
        getHumidity(value)
        getPrecip(value)
        getPressure(value)
        getUV(value)
        getVisibility(value)
    })
    .catch((err) => {
        console.log(err)
        showErr();
    })
}


function showErr() {
    setTimeout(() => {
        const warning = document.createElement('div');
        warning.className = 'warning'
        warning.textContent = 'City not found!'
        LocationField.appendChild(warning);
    }, 500)
}

function handleDisplay(value, Class, parent){
    const div = document.createElement('div');
    div.innerText = value;
    div.className = `${Class}`;
    parent.appendChild(div);
}

function handleDisplayForGrid(value, parent, content){
    const gridContainer = document.createElement('div');
    const header = document.createElement('div');
    const gridContent = document.createElement('div');

    header.innerText = content;
    gridContent.innerText = value;
    
    gridContainer.className = 'gridCells';
    header.className = 'header';

    
    parent.appendChild(gridContainer);
    gridContainer.appendChild(header);
    gridContainer.appendChild(gridContent);
}

function handleIconDisplay(value, Class, parent){
    const img = document.createElement('img');
    img.src = value;
    img.className = `${Class}`;
    parent.appendChild(img);
}





function convertDateFormat(dateStr) {
    const inputDate = new Date(dateStr);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const dayOfWeek = days[inputDate.getDay()];
    const dayOfMonth = inputDate.getDate();
    const month = months[inputDate.getMonth()];
    const year = inputDate.getFullYear().toString();
    let hours = inputDate.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert midnight (0) to 12
    const minutes = inputDate.getMinutes();
  
    const formattedDate = `${dayOfWeek}, ${dayOfMonth}th ${month} ${year}  |  ${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    return formattedDate;
}
  
submit.addEventListener('click', run)
input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        run();
      }
});

runInitialLoading();