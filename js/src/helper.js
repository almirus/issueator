'use strict';

import {AUTO_SCREENSHOT_FLAG, DOM_ELEMENTS_PREFIX, SERVER_API_URL} from "./utils/const";
import {toFormUrlEncoder} from "./utils/postEncoder";
import {getScreenShot} from "./utils/screenshot";
import {getEnvironment} from "./utils/environment";
import {prepare} from "./utils/prepare";
import {dragElement} from "./utils/drag";

prepare();

document.addEventListener("DOMContentLoaded", () => {
    let button_div = document.createElement("span");
    button_div.setAttribute("id", DOM_ELEMENTS_PREFIX + "submit_error_button");
    button_div.innerHTML = "&#8227; Ошибка <span>Создать обращение в Jira</span>";
    let textarea_div = document.createElement("span");
    textarea_div.setAttribute("id", DOM_ELEMENTS_PREFIX + "error_message");
    textarea_div.style.visibility = "hidden";
    let text_area = document.createElement("textarea");
    text_area.placeholder = `Подробно опишите Вашу проблему${AUTO_SCREENSHOT_FLAG ? ', к обращению будет автоматически приложен скриншот этой страницы' : ''}`;
    text_area.setAttribute("id", DOM_ELEMENTS_PREFIX + "error_description");
    text_area.setAttribute("required", "");
    text_area.name = "description";
    let submit_button = document.createElement("button");
    submit_button.appendChild(document.createTextNode("Создать обращение"));
    let cancel_button = document.createElement("button");
    cancel_button.appendChild(document.createTextNode("Отмена"));
    textarea_div.appendChild(text_area);
    textarea_div.appendChild(document.createElement("br"));
    textarea_div.appendChild(submit_button);
    textarea_div.appendChild(cancel_button);

    cancel_button.onclick = () => {
        textarea_div.style.visibility = "hidden";
        text_area.value = "";
    };
    button_div.onclick = () => {
        textarea_div.style.visibility = "visible";
    };
    submit_button.onclick = async () => {
        button_div.style.visibility = "hidden";
        textarea_div.style.visibility = "hidden";
        // отправляем собранную информацию
        fetch(SERVER_API_URL, {
            method: 'POST',
            mode: 'cors',
            body: toFormUrlEncoder({
                title: 'Пользовательская ошибка из Скоринг',
                description: document.getElementById(DOM_ELEMENTS_PREFIX + "error_description").value,
                base64FileBody: await getScreenShot(),
                log: getEnvironment(),
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(response => response.json())
            .then(res => {
                button_div.style.visibility = "visible";
                textarea_div.style.visibility = "visible";
            });

    };
    document.body.appendChild(button_div);
    document.body.appendChild(textarea_div);
    dragElement(button_div, textarea_div);
});