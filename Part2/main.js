console.log("Загрузка main.js")

function createScript(src, callback) {
    if (!document.querySelector(`script[src$="${src}"]`)) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        script.onerror = function() {
            console.log(`Не удалось загрузить файл ${src}`);
        }
        document.head.insertAdjacentElement('beforeend', script);
    } else {
        callback();
    }
}

function loadScript(src, callback) {
    if (typeof src === 'string') {
        createScript(src, callback);
    } else if (typeof src === 'object') {
        src.forEach(element => {
            createScript(element, callback);
        });
    } else if (typeof src === 'function') {
        src;
    } else return console.log("Ошибка выполнения функции loadScript: аргументами могут быть только строка, массив или функция");

}

function log() {
    console.log("Исполнение колбэка без скрипта");
}

// загрузка мнескольких скриптов
loadScript(['./common.js', './timer.js', './luxon.js'], () => {
    log();
})

// загрузка одного скрипта
loadScript('./common.js', () => {
    log();
})

// загрузка колбэка
// loadScript(() => {
//     log();
// })