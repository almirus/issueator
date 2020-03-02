'use strict';

import {ButtonWidget} from "./class/buttonWidget";
import {toFormUrlEncoder} from "./utils/postEncoder";
import {DOM_ELEMENTS_PREFIX, SERVER_API_URL} from "./utils/const";
import {getScreenShot} from "./utils/screenshot";
import {getEnvironment} from "./utils/environment";

document.addEventListener("DOMContentLoaded", () => {

    let widget = new ButtonWidget();
    widget.handleSend = async function () {
        let description = `
            url: ${window.location.href}
            time: ${new Date().toLocaleString()} (${Intl.DateTimeFormat().resolvedOptions().timeZone})
            ${document.getElementById(DOM_ELEMENTS_PREFIX + "error_description").value}`;
        fetch(SERVER_API_URL, {
            method: 'POST',
            mode: 'cors',
            body: toFormUrlEncoder({
                title: 'Пользовательская ошибка из Скоринг',
                description: description,
                base64FileBody: await getScreenShot(),
                log: getEnvironment(),
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(response => response.json())
            .then(res => {

            });
    };
    widget.drag();
});