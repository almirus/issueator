import {ACTUATOR_URL} from "./const";

export async function getVersionFromActuator(url) {
    // берем url до папки с приложение
    let appUrl = url.match(/.+(\/)(?!.*\1)/gm)
    if (appUrl) {
        const resp = await fetch(appUrl + ACTUATOR_URL);
        return await resp.json();
    }
    return '';
}