// Add time and date
let time = document.querySelector('.time');
let date = document.querySelector('.date');
let week = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
let months = ["января", "февраля", "марта", "мая", "апреля", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
let nowDate = new Date();

 const timer = () => {
    let now = new Date().toTimeString().replace(/ .*/, '');
    let sec = new Date().getSeconds();
    time.innerHTML = sec%2 ? now : now.replace(/:/g, ' ');
  }
  setInterval(timer, 1000);

  date.innerHTML = week[nowDate.getDay()-1]+', '+nowDate.getDate()+' '+months[nowDate.getMonth()];

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
    localStorage.clear();
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