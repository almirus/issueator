import {SERVER_API_URL} from "./const";
import {toFormUrlEncoder} from "./postEncoder";

export async function send({
                               api_url = SERVER_API_URL,
                               title = 'Пользовательская ошибка',
                               description = '',
                               log = undefined,
                               screenshot = undefined,
                           } = {}) {
    // объект для функции toFormUrlEncoder из входящих параметров
    let body = {
        title: title,
        description: description,
        log: log,
        base64FileBody: screenshot,
    };
    console.log('try to send via fetch');
    try {
        // объект с полями преобразуем для отправки в виде application/x-www-form-urlencoded
        let bodyFormUrlEncoded = toFormUrlEncoder(body);
        const resp = await fetch(api_url, {
            method: 'POST',
            mode: 'cors',
            body: bodyFormUrlEncoded,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        return await resp.json();
    } catch (err) {
        console.error('Произошла ошибка', err);
    }

}