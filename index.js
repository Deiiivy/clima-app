
const result = document.querySelector('.result')
const form = document.querySelector('.get-weather')
const nameCity = document.querySelector('#city')
const nameCountry = document.querySelector('#country')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if(nameCity.value === ''){
        mostrarError('los campos estan vacios')
        return
    }


    llamarAPI(nameCity.value)
    console.log(nameCity.value);
})


function llamarAPI(city){
    const API = '7246eab1f60e397c2a4a0d6038081979'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`
    https://api.openweathermap.org/data/2.5/weather?q=medellin&units=metric&appid=7246eab1f60e397c2a4a0d6038081979
    fetch(url)
    .then(data => {
        return data.json()
    })
    .then(dataJSON => {
        if (dataJSON.cod === '404') {
            mostrarError('ciudad no encontrada') 
        } else {
            showWeather(dataJSON)
            console.log(dataJSON);
        }
    })
    .catch(error => {
        mostrarError('Hubo un error en la solicitud') 
    });
   
}


function showWeather(data){

    const {name, main:{temp, humidity, pressure, viento}, wind:{deg, speed}} = data
    const content = document.createElement('div')

    
    content.innerHTML = `<h5 style="color:white" >Clima en ${name}</h5>
    <h2>temperatura: ${temp}</h2>
    <h2>humedad: ${humidity}</h2>
    <h2>presion atmosferica: ${pressure}</h2>
    <h2>Viento: ${speed}</h2>`
    

    result.appendChild(content)
    console.log(name);
    console.log(temp);
}

function mostrarError(message) {
    console.log(message);
    const alertError = document.createElement('p')
    alertError.classList.add('alert-message')
    alertError.innerHTML = message

    form.appendChild(alertError)
    setTimeout(()=>{
        alertError.remove();
    },3000)
}



