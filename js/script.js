// Add time and date
let time = document.querySelector('.time');
let date = document.querySelector('.date');
 const timer = () => {
    let now = new Date().toTimeString().replace(/ .*/, '');
    let sec = new Date().getSeconds();
    time.innerHTML = sec%2 ? now : now.replace(/:/g, ' ');
  }
  setInterval(timer, 1000);

  let nowDate = new Date();
  let week = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
  let months = ["января", "февраля", "марта", "мая", "апреля", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  date.innerHTML = week[nowDate.getDay()-1]+', '+nowDate.getDate()+' '+months[nowDate.getMonth()];




