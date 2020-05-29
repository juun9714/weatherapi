const weather=document.querySelector(".js-weather");


const API_KEYS="a46b64984d8ddb2efa8ff2c8d254fbc2";
const COORDS = 'coords';

function getWeather(lat,lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEYS}&units=metric`
        )
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            const temperature=json.main.temp;
            const place=json.name;
            weather.innerText=`${temperature}@ ${place}`; 
            console.log(json);
        });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsObj={
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
    console.log(position);
}
function handleGeoError(){
    console.log('Cant access geo location');
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}
function loadCoords(){
    const loadedCords=localStorage.getItem(COORDS)
    if(loadedCords===null){
        askForCoords();
    }else{
        const parsedCoords=JSON.parse(loadedCords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}
function init(){
    loadCoords();
}
init();