import {ERROR_MESSAGEBOX} from "./const";

export function getEnvironment() {
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return `
    * Platform: ${navigator.platform}
    * Oscpu: ${navigator.oscpu}
    * Browser CodeName: ${navigator.appCodeName}
    * Browser Name: ${navigator.appName}
    * Browser Version: ${navigator.appVersion}
    * Cookies Enabled: ${navigator.cookieEnabled}
    * Platform: ${navigator.platform}
    * Width: ${w}
    * Height: ${h}`;
}

export function getErrorMessage(document) {
    if (!document) return '';
    let error_window = document.getElementById(ERROR_MESSAGEBOX);
    if (error_window) {
        // стек ошибки
        let stack = '';
        const children = [...document.getElementsByTagName('textarea')];
        children.forEach((textarea) => {
            stack += textarea.value;
        });
        // читаемая ошибка + стек
        return (error_window.innerText || '').replace(/\n{2,}/g, '\n') + stack;
    } else {
        return '';
    }
}