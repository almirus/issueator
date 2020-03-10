import Cookies from "js-cookie";
import {AUTO_SCREENSHOT_FLAG, DOM_ELEMENTS_PREFIX} from "../utils/const";
import {dragElement} from "../utils/drag";

export class ButtonWidget {
    constructor(x = '40px', y = '5px') {
        console.log('call constructor');
        let button_div = document.createElement("span");
        button_div.style.top = Cookies.get(DOM_ELEMENTS_PREFIX + '_x') || x;
        button_div.style.left = Cookies.get(DOM_ELEMENTS_PREFIX + '_y') || y;
        button_div.setAttribute("id", DOM_ELEMENTS_PREFIX + "submit_error_button");
        button_div.innerHTML = "&#8227; Ошибка <span>Создать обращение в Jira</span>";
        let textarea_div = document.createElement("span");
        textarea_div.setAttribute("id", DOM_ELEMENTS_PREFIX + "error_message");
        textarea_div.style.visibility = "hidden";

        textarea_div.style.top = Cookies.get(DOM_ELEMENTS_PREFIX + '_x') || x;
        textarea_div.style.left = Cookies.get(DOM_ELEMENTS_PREFIX + '_y') || y;

        let text_area = document.createElement("textarea");
        text_area.placeholder = `Подробно опишите Вашу проблему${AUTO_SCREENSHOT_FLAG ? ', к обращению будет автоматически приложен скриншот этой страницы' : ''}`;
        text_area.setAttribute("id", DOM_ELEMENTS_PREFIX + "error_description");
        text_area.required = true;
        text_area.name = "description";
        let submit_button = document.createElement("button");
        submit_button.appendChild(document.createTextNode("Создать обращение"));
        let cancel_button = document.createElement("button");
        cancel_button.appendChild(document.createTextNode("Отмена"));
        textarea_div.appendChild(text_area);
        textarea_div.appendChild(document.createElement("br"));
        textarea_div.appendChild(submit_button);
        textarea_div.appendChild(cancel_button);
        let result_area = document.createElement("div");
        result_area.setAttribute("id", DOM_ELEMENTS_PREFIX + "result");
        result_area.style.visibility = "hidden";

        cancel_button.onclick = () => {
            textarea_div.style.visibility = "hidden";
            text_area.value = "";
        };
        button_div.onclick = () => {
            textarea_div.style.visibility = "visible";
        };
        submit_button.onclick = () => {
            button_div.style.visibility = "hidden";
            textarea_div.style.visibility = "hidden";
            // отправляем собранную информацию
            this.handleSend().then(result => {
                console.log('get result', result);
                result_area.style.visibility = "visible";
                if (result && result.link) {
                    result_area.appendChild(document.createTextNode("Вы можете отредактировать созданное обращение "));
                    let a = document.createElement('a');
                    a.href = result.link;
                    a.target = "_blank";
                    a.title = "перейти в обращение";
                    a.appendChild(document.createTextNode("по ссылке"));
                    result_area.appendChild(a);
                } else {
                    result_area.appendChild(document.createTextNode("Произошла ошибка при создании обращения, подробности в консоли"));
                }
                let close = document.createElement('span');
                close.title = "Закрыть";
                close.className = 'close';
                close.onclick = () => {
                    result_area.style.visibility = "hidden";
                };
                result_area.setAttribute("id", DOM_ELEMENTS_PREFIX + "result");
                result_area.appendChild(close);
            });
        };
        this._result = result_area;
        this._button = button_div;
        this._children = textarea_div;
    }

    render() {
        document.body.appendChild(this._button);
        document.body.appendChild(this._children);
        document.body.appendChild(this._result);
        dragElement(this._button, this._children);
        console.log('call render');
    }
}