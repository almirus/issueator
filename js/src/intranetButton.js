'use strict';

import {ButtonWidget} from "./class/buttonWidget";
import './css/buttonWidget.css';
import {send} from "./utils/sender";
import {DOM_ELEMENTS_PREFIX} from "./utils/const";

document.addEventListener("DOMContentLoaded", () => {

    let widget = new ButtonWidget();
    // основной обработчик
    widget.handleSend = async () => {
        console.log('handleSend');
        let description = `
            url: ${widget.url()}
            time: ${new Date().toLocaleString()} (${Intl.DateTimeFormat().resolvedOptions().timeZone})
            ${document.getElementById(DOM_ELEMENTS_PREFIX + "error_description").value}`;
        // получаем отредактированный скриншот через виджет или обычный
        let screenShot = widget.screenshot();
        let log = `
        ${JSON.stringify(widget.serverEnvironment())}
        ${widget.clientEnvironment()}
        `;
        // -----> отправка данных на сервис
        return await send({
            title: 'Пользовательская ошибка',
            description: description,
            log: log,
            screenshot: screenShot
        })
    };
    widget.render();
});