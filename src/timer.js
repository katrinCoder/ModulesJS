import { Duration } from "luxon";

export function remainTime(setHours, setMinutes, setSeconds) {
    let timerLast = Duration.fromObject({hours: setHours, minutes: setMinutes, seconds: setSeconds}).mapUnits((x, u) => u === "seconds" ? x-1 : x).normalize().toObject();
    return timerLast;
}