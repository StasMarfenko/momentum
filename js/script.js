// Add time and date
let time = document.querySelector('.time');
let date = document.querySelector('.date');
let week = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
let months = ["января", "февраля", "марта", "мая", "апреля", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
let nowDate = new Date();

 const timer = () => {
    let now = new Date().toTimeString().replace(/ .*/, '');
    let sec = new Date().getSeconds();
    time.innerHTML = sec%2 ? now : now.replace(/:/g, ' ');
  }
  setInterval(timer, 1000);

  date.innerHTML = week[nowDate.getDay()]+', '+nowDate.getDate()+' '+months[nowDate.getMonth()];
// Add greeting
let addName = document.querySelector('.name');
let greeting = document.querySelector('.greeting');
let arrGreeting = ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'];
let min = nowDate.getMinutes();
let hours = nowDate.getHours();

function welcome(){
    return  hours>=6&&hours<12 ? 1 :
            hours>=12&&hours<18 ? 2 :
            hours>=18&&hours<24 ? 3 : 0
}
greeting.innerHTML = arrGreeting[welcome()];
addName.value = localStorage.getItem('yourName')
addName.addEventListener('input', ()=>{
    localStorage.removeItem('yourName');
    localStorage.setItem('yourName', addName.value);
})

// Add background image and slider
let bgImageDay = ['night', 'morning', 'afternoon', 'evening']
let maxCount = 20;
let numBgImage = randomNum(1,maxCount);

function randomNum(minCount, maxCount) {
    return Math.floor(minCount + Math.random() * (maxCount - minCount));
    
}
imageBg(numBgImage);
const sliderNext = document.querySelector('.slide-next');
const sliderPrev = document.querySelector('.slide-prev');

sliderNext.addEventListener('click', ()=>{
    numBgImage >= maxCount ? numBgImage=1 : numBgImage++;
imageBg(numBgImage);
})

sliderPrev.addEventListener('click', ()=>{
    numBgImage <= 1 ? numBgImage=maxCount : numBgImage--;
imageBg(numBgImage);
})

function imageBg(count) {
    count < 10 ? count = '0'+count : count;
    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${bgImageDay[welcome()]}/${count}.jpg')`;
}

// Add widget quotes API
let quote = document.querySelector('.quote');
let author = document.querySelector('.author');
let changeQuote = document.querySelector('.change-quote');

async function Quotes() {  
    const quot = 'https://type.fit/api/quotes';
    const res = await fetch(quot);
    const dataQ = await res.json(); 
    innerQuotes(dataQ,dataQ.length);
    changeQuote.addEventListener('click', ()=>{
        innerQuotes(dataQ,dataQ.length);
    })
  }

  function innerQuotes(dataQ, maxNum){
    let num = randomNum(1,maxNum);
    quote.innerHTML = '"'+dataQ[num]['text']+'"';
    author.innerHTML = dataQ[num]['author'];
  }

  Quotes();


  // Add widget weathers API
const city = document.querySelector('.city');
const temperature = document.querySelector('.temperature');
const iconWeather = document.querySelector('.weather-icon');
const error = document.querySelector('.weather-error');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
city.addEventListener('blur', ()=>{
    localStorage.removeItem('cityKey');
    localStorage.setItem('cityKey', city.value);

    Weather(city.value);
})
city.addEventListener('keyup', (event)=>{
    if (event.keyCode === 13){
        localStorage.removeItem('cityKey');
        localStorage.setItem('cityKey', city.value);
        Weather(city.value)
    }
})

if(localStorage.cityKey != '' && localStorage.cityKey != undefined){
    city.value = localStorage.getItem('cityKey');
    Weather(localStorage.getItem('cityKey'));
} else {
    city.value = 'Минск';
    Weather('Минск');
}

  async function Weather(cityGet) {  
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${cityGet}&lang=ru&appid=4ebdb346a0d3b4d400d1988d96a95766&units=metric`;
    const resultWeather = await fetch(link);
    const dateWeather = await resultWeather.json();
    if(dateWeather.cod === '404' || dateWeather.cod === '400'){
        localStorage.removeItem('cityKey');
        temperature.innerHTML='';
        wind.innerHTML='';
        humidity.innerHTML='';
        iconWeather.className = 'weather-icon owf';
        error.innerHTML = 'Такого города не найдено!'
    } else {
        let temp = Math.floor(dateWeather.main.temp)+'°C ';
        let weat = dateWeather['weather'][0]['description'];
        // let wind = dateWeather.wind['speed'];
        let icon = dateWeather.weather[0].id;
        temperature.innerHTML = temp + weat;
        wind.innerHTML = 'Скорость ветра: '+dateWeather.wind['speed'].toFixed(0)+' м/с';
        humidity.innerHTML = 'Влажность: '+dateWeather.main['humidity'].toFixed(0)+'%';
        iconWeather.className = 'weather-icon owf';
        iconWeather.classList.add(`owf-${icon}`);
        error.innerHTML='';
    }
// console.log(dateWeather.weather[0].id, dateWeather.weather[0].description, dateWeather.main.temp);
  }