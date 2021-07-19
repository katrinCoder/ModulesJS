
export function changeHTML(pageDate, pageTimer, dateCalcForm, timerForm) {
    pageDate.classList.toggle("pushed");
    pageTimer.classList.toggle("pushed");    
    dateCalcForm.classList.toggle("invisible");
    timerForm.classList.toggle("invisible");
}
