import {DOM_ELEMENTS_PREFIX} from "../utils/const";

export class CtrlEnterWidget {
    constructor(x, y) {
        let div = document.createElement("span");
        div.setAttribute("id", DOM_ELEMENTS_PREFIX + "text_area_div");
        div.style.visibility = "hidden";
        let label = document.createElement('span');
        label.className = DOM_ELEMENTS_PREFIX + 'selected_text_desc';
        label.innerText = 'Выделен текст:';
        let selectedText = document.createElement('span');
        selectedText.setAttribute('id', DOM_ELEMENTS_PREFIX + "selected_text");
        let text_area = document.createElement("textarea");
        text_area.placeholder = 'Подробно опишите ошибку';
        text_area.setAttribute("id", DOM_ELEMENTS_PREFIX + "error_description");
        text_area.required = true;
        text_area.name = "description";
        div.appendChild(label);
        div.appendChild(selectedText);
        div.appendChild(text_area);
        let submit_button = document.createElement("button");
        submit_button.appendChild(document.createTextNode("Отправить"));
        submit_button.onclick = () => {
            div.style.visibility = "hidden";
            // отправляем информацию
            this.handleSend().then(result => {
                div.style.visibility = "hidden";
                text_area.value = "";
                if (result)
                    console.log('feedback was sent');
                else
                    console.error('feedback wasn\'t sent')
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
        this._selected_text = selectedText;
    }

    render() {
        document.body.appendChild(this._textarea_div);
    }

    set selectedText(text) {
        this._selectedText = text + '';
        this._selected_text.innerText = text;
    }

    get selectedText() {
        return this._selectedText;
    }

    show() {
        this._textarea_div.style.visibility = "visible";
    }
}