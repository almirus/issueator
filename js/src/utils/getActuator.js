import {ACTUATOR_URL} from "./const";

export async function getVersionFromActuator(url) {
    // берем url до папки с приложение
    let appUrl = url.match(/.+(\/)(?!.*\1)/gm)
    if (appUrl) {
        try {
            const resp = await fetch(appUrl + ACTUATOR_URL);
            if (resp.ok)
                return JSON.stringify(await resp.json());
        } catch (error) {
            console.error(error)
        }
    }
    return '';
}