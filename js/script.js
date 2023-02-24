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
    for(let i = 1; i < arrGreeting.length; i++){
        return hours>=6*i&&hours<6*i+6 ? i : 0
    }
}
greeting.innerHTML = arrGreeting[welcome()];
addName.value = localStorage.getItem('yourName')
addName.addEventListener('input', ()=>{
    localStorage.clear();
    localStorage.setItem('yourName', addName.value);
})
console.log();
