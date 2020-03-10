import {CtrlEnterWidget} from "./class/ctrlEnterWidget";
import './css/ctrlEnterWidget.css';
import {DOM_ELEMENTS_PREFIX} from "./utils/const";
import {getEnvironment} from "./utils/environment";
import {send} from "./utils/sender";

document.addEventListener("DOMContentLoaded", () => {
    let widget = new CtrlEnterWidget();
    widget.render();
    document.addEventListener('keydown', (event) => {
        let key = event.which;
        if (event.ctrlKey && key === 13) {
            widget.show();
            widget.selectedText = window.getSelection();
            widget.handleSend = async () => {
                console.log('handleSend');
                let log = getEnvironment();
                let description = `
                                url: ${window.location.href}
                                time: ${new Date().toLocaleString()} (${Intl.DateTimeFormat().resolvedOptions().timeZone})
                                ${document.getElementById(DOM_ELEMENTS_PREFIX + "error_description").value}
                                Был выделен текст: ${widget.selectedText}
                                ${log}`;
                // -----> отправка данных на сервис
                return await send({
                    title: 'Пользовательская ошибка с сайта',
                    description: description,
                })
            };
        }
    }, false);
});