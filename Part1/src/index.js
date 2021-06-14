import { diffDates, diffToHtml } from "./datecalc.js"; // 1
import { formatError } from "./utils.js"; // 2
import { changeHTML } from "./select.js";
import { remainTime } from "./timer.js";
import { DateTime } from "./luxon.js";
import { Howl } from "./howler.js";

// Калькулятор дат
const dateCalcForm = document.getElementById("datecalc");
const dateCalcResult = document.getElementById("datecalc__result");

dateCalcForm.addEventListener("submit", handleCalcDates);

function handleCalcDates(event) {
    dateCalcResult.innerHTML = "";
    event.preventDefault();

    let { firstDate, secondDate } = event.target.elements;
    firstDate = firstDate.value, secondDate = secondDate.value;
    if (firstDate && secondDate) {
        const diff = diffDates(firstDate, secondDate); // 3
        dateCalcResult.innerHTML = diffToHtml(diff); // 4
    } else dateCalcResult.innerHTML = formatError("Для расчета промежутка необходимо заполнить оба поля"); // 5
}

// Таймер
const timerForm = document.getElementById("timer");
const timeLast = document.getElementById("timeLast");
const timeError = document.getElementById("time__error");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");

const sound = Howl({
    src: ['./media/alarm.webm', './media/alarm.mp3']
});

timerForm.addEventListener('submit', function(event){
    event.preventDefault();
    timeError.innerHTML = "";
    let { timerSetHour, timerSetMin, timerSetSec } = event.target.elements;
    timerSetHour = timerSetHour.value, timerSetMin = timerSetMin.value, timerSetSec = timerSetSec.value;
    if (timerSetSec !== '0' || timerSetMin !== '0' || timerSetHour !== '0') {
        const intervalTimer = window.setInterval(myCallback, 1000, timerSetHour, timerSetMin, timerSetSec);
        function myCallback() {
            // let { remainHour, remainMin, remainSec } = remainTime(timerSetHour, timerSetMin, timerSetSec);
            let lastTime = remainTime(timerSetHour, timerSetMin, timerSetSec);
            console.log(lastTime);
            timerForm.elements.timerSetHour.value = timerSetHour = lastTime.hours;
            timerForm.elements.timerSetMin.value = timerSetMin = lastTime.minutes;
            timerForm.elements.timerSetSec.value = timerSetSec = lastTime.seconds;
            
            // timerSetHour = lastTime.hours, timerSetMin = lastTime.minutes, timerSetSec = lastTime.seconds;
            
            if (lastTime.hours === 0 && lastTime.minutes === 0 && lastTime.seconds === 0) {
                clearInterval(intervalTimer);
                sound.play();
                //звонок!
            }
            // pauseButton.addEventListener('click', clearInterval(intervalTimer));
            // resetButton.addEventListener('click', clearInterval(intervalTimer));
            pauseButton.onclick = resetButton.onclick = function() {
                clearInterval(intervalTimer);
            };
        }
    } else timeError.innerHTML = formatError("Для запуска таймера необходимо установить время");

    // pauseButton.addEventListener('click', clearInterval(intervalTimer));
    // resetButton.addEventListener('click', clearInterval(intervalTimer));
    // pauseButton.onclick = resetButton.onclick = clearInterval(intervalTimer);
});


//Перключение между функциями
const pageDate = document.querySelector(".pageDates");
const pageTimer = document.querySelector(".pageTimer");

pageDate.onclick = pageTimer.onclick = function(){changeHTML(pageDate, pageTimer, dateCalcForm, timerForm);};