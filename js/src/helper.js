'use strict';

import {ButtonWidget} from "./class/buttonWidget";
import {toFormUrlEncoder} from "./utils/postEncoder";
import {DOM_ELEMENTS_PREFIX, SERVER_API_URL} from "./utils/const";
import {getScreenShot} from "./utils/screenshot";
import {getEnvironment} from "./utils/environment";
import './css/buttonWidget.css';

document.addEventListener("DOMContentLoaded", () => {

    let widget = new ButtonWidget();
    widget.handleSend = async function () {
        console.log('handleSend');
        let description = `
            url: ${window.location.href}
            time: ${new Date().toLocaleString()} (${Intl.DateTimeFormat().resolvedOptions().timeZone})
            ${document.getElementById(DOM_ELEMENTS_PREFIX + "error_description").value}`;
        let screenShot = await getScreenShot();
        try {
            const resp = await fetch(SERVER_API_URL, {
                method: 'POST',
                mode: 'cors',
                body: toFormUrlEncoder({
                    title: 'Пользовательская ошибка из Скоринг',
                    description: description,
                    base64FileBody: screenShot,
                    log: getEnvironment(),
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            return resp.json();
        } catch (err) {
            console.log(err)
        }
    };
    widget.render();
});