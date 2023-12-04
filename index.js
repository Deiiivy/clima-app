
const result = document.querySelector('.result')
const form = document.querySelector('.get-weather')
const nameCity = document.querySelector('#city')
const nameCountry = document.querySelector('#country')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if(nameCity.value === '' || nameCountry.value === ''){
        showError('los campos estan vacios')
        return
    }


    callAPI(nameCity.value, nameCountry.value)
    /* console.log(nameCity.value);
    console.log(country.value) */
})


function callAPI(city, country){
    const API = '7246eab1f60e397c2a4a0d6038081979'
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API}`;
    

    fetch(url)
    .then(data => {
        return data.json()
    })
    .then(dataJSON => {
        if (dataJSON.cod === '404') {
            showError('ciudad no encotrada')
        }else {
            clearHTML()
            showWeather(dataJSON)
        }
        /* console.log(dataJSON); */
    })
}

function showWeather(data){

    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data
    const content = document.createElement('div')

    const grados = kelvinToCentigrade(temp)
    const min = kelvinToCentigrade(temp_min)
    const max = kelvinToCentigrade(temp_max)
    
    content.innerHTML = `<h5>Clima en ${name}</h5>
    <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon" >
    <h2>${grados}</h2>
    <p>Max: ${max}</p>
    <p>Min: ${min}</p> `

    result.appendChild(content)
    /* console.log(name);
    console.log(temp);
    console.log(temp_min);
    console.log(temp_max);
    console.log(arr.icon); */
}

function showError(message) {
    console.log(message);
    const alertError = document.createElement('p')
    alertError.classList.add('alert-message')
    alertError.innerHTML = message

    form.appendChild(alertError)
    setTimeout(()=>{
        alertError.remove();
    },3000)
}

function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    result.innerHTML = ''
}
