'use strict';

import {ButtonWidget} from "./class/buttonWidget";
import {DOM_ELEMENTS_PREFIX} from "./utils/const";
import {getScreenShot} from "./utils/screenshot";
import {getEnvironment} from "./utils/environment";
import './css/buttonWidget.css';
import {send} from "./utils/sender";

document.addEventListener("DOMContentLoaded", () => {

    let widget = new ButtonWidget();
    // основной обработчик
    widget.handleSend = async () => {
        console.log('handleSend');
        let description = `
            url: ${window.location.href}
            time: ${new Date().toLocaleString()} (${Intl.DateTimeFormat().resolvedOptions().timeZone})
            ${document.getElementById(DOM_ELEMENTS_PREFIX + "error_description").value}`;
        // получаем отредактированный скриншот через виджет или обычный
        let screenShot = widget.screenshot() || await getScreenShot();
        let log = getEnvironment();
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