import {AUTO_SCREENSHOT_FLAG, DOM_ELEMENTS_PREFIX} from "../utils/const";

export class CtrlEnterWidget {
    constructor(x,y) {
        let div = document.createElement("span");
        div.setAttribute("id", DOM_ELEMENTS_PREFIX + "text_area_div");
        div.style.visibility = "hidden";
        let text_area = document.createElement("textarea");
        text_area.placeholder = `Подробно опишите Вашу проблему${AUTO_SCREENSHOT_FLAG ? ', к обращению будет автоматически приложен скриншот этой страницы' : ''}`;
        text_area.setAttribute("id", DOM_ELEMENTS_PREFIX + "error_description");
        text_area.required = true;
        text_area.name = "description";
        div.appendChild(text_area);
        let submit_button = document.createElement("button");
        submit_button.appendChild(document.createTextNode("Отправить"));
        submit_button.onclick = () => {
            div.style.visibility = "hidden";
            // отправляем информацию
            this.handleSend().then(result => {
            })
        };
        let cancel_button = document.createElement("button");
        cancel_button.onclick = () => {
            div.style.visibility = "hidden";
            text_area.value = "";
        };
        cancel_button.appendChild(document.createTextNode("Отменить"));
        div.appendChild(submit_button);
        div.appendChild(cancel_button);
        this._textarea_div = div;
    }
    render(){
        document.body.appendChild(this._textarea_div);
    }
    show(){
        this._textarea_div.style.visibility = "visible";
    }
}