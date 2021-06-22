import { Duration } from "./luxon.js";
//   СТАРТ
// export function remainTime(setTime){
//     setTime = DateTime.fromISO(setTime) - 1000;
//     return DateTime.toISO(setTime);
// }

export function remainTime(setHours, setMinutes, setSeconds) {
    let timerLast = Duration.fromObject({hours: setHours, minutes: setMinutes, seconds: setSeconds}).mapUnits((x, u) => u === "seconds" ? x-1 : x).normalize().toObject();
    // return remainTime.hours, remainTime.minutes, remainTime.seconds;
    return timerLast;
}
// Ввести крайние значения значения interval.set или как-то так
// Перевести начальное значение в сек
// Минусовать по секунде
// Выводить каждую секунду в браузер
// В конце звук! 

//   СТОП
// Прекратить миносовть время

//   СБРОС ???
// Обнулить введенное значение