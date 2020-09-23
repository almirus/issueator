import Cookies from "js-cookie";
import {AUTO_SCREENSHOT_FLAG, DOM_ELEMENTS_PREFIX} from "../utils/const";
import {dragElement} from "../utils/drag";
import {getScreenShot} from "../utils/screenshot";
import {getActiveFrame} from "../utils/getActiveFrame";
import {getEnvironment} from "../utils/environment";
import {getVersionFromActuator} from "../utils/getActuator";

export class ButtonWidget {
    constructor(x = '40px', y = '5px') {
        console.log('call constructor');
        // плавающая кнопка Создать обращение
        let button_div = document.createElement("span");
        button_div.style.top = Cookies.get(DOM_ELEMENTS_PREFIX + '_x') || x;
        button_div.style.left = Cookies.get(DOM_ELEMENTS_PREFIX + '_y') || y;
        button_div.setAttribute("id", DOM_ELEMENTS_PREFIX + "submit_error_button");
        button_div.innerHTML = "&#8227; Ошибка <span>Создать обращение в Jira</span>";
        // поле для ввода, пока невидимое
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

        // кнопки Создать Отмена Нарисовать
        let buttons_container = document.createElement("div");
        buttons_container.setAttribute("id", DOM_ELEMENTS_PREFIX + "buttons_container");
        let submit_button = document.createElement("button");
        submit_button.appendChild(document.createTextNode("Создать обращение"));
        let cancel_button = document.createElement("button");
        cancel_button.appendChild(document.createTextNode("Отмена"));
        let paint_button = document.createElement("button");
        paint_button.setAttribute('title', 'Нарисовать на скриншоте');
        paint_button.appendChild(document.createTextNode("🎨"));
        textarea_div.appendChild(text_area);
        buttons_container.appendChild(submit_button);
        buttons_container.appendChild(cancel_button);
        buttons_container.appendChild(paint_button);
        textarea_div.appendChild(buttons_container);

        let result_area = document.createElement("div");
        result_area.setAttribute("id", DOM_ELEMENTS_PREFIX + "result");
        result_area.style.visibility = "hidden";
        // нажали кнопку нарисовать на скриншоте
        paint_button.onclick = async () => {
            button_div.style.visibility = "hidden";
            textarea_div.style.visibility = "hidden";
            // для intranet приложений сохраняет скрин активного iframe или окна
            let activeFrame = getActiveFrame();
            // скриншот основного окна
            let screenShotMain = await getScreenShot(document.body);
            // скриншот области с приложением - специфично для jepria и gwt
            let screenShotFrame = await getScreenShot(activeFrame.body);
            // canvas на котором будем рисовать
            let canvas = document.createElement("canvas");
            canvas.setAttribute("id", DOM_ELEMENTS_PREFIX + "paint_canvas");
            canvas.setAttribute('style', "background: #000; padding: 0;margin: 0 auto; cursor:crosshair; position:absolute; left:0; top:0; border: 2px dashed yellow;");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            let end_paint_button = document.createElement('button');
            end_paint_button.appendChild(document.createTextNode("Готово 🎨"));
            end_paint_button.setAttribute('title', 'Завершить рисование');
            // реальные координаты кнопки начать Рисование, нужны чтобы отобразить там же кнопку завершения
            let rect = paint_button.getBoundingClientRect();
            end_paint_button.setAttribute('style', `left:${rect.left}px;top:${rect.top}px;position:fixed;`);
            // клик по кнопке Завершить рисование
            end_paint_button.onclick = async () => {
                console.log('painting end');
                this._screenshot = canvas.toDataURL("image/png");
                this._url = activeFrame.url;
                this._serverEnvironment = await getVersionFromActuator(activeFrame.url);
                button_div.style.visibility = "visible";
                textarea_div.style.visibility = "visible";
                document.body.removeChild(canvas);
                document.body.removeChild(end_paint_button);
            }
            document.body.appendChild(canvas);
            document.body.appendChild(end_paint_button);
            let destCtx = canvas.getContext('2d');
            let screen_main_image = new Image;
            screen_main_image.onload = function () {
                // рисуем сначала в наш canvas скриншот - основное окно
                destCtx.drawImage(screen_main_image, 0, 0);
            };
            screen_main_image.src = screenShotMain;
            if (document.body !== activeFrame.body) {
                let screen_frame_image = new Image;
                screen_frame_image.onload = function () {
                    let frame_rect = activeFrame.body.getBoundingClientRect();
                    // рисуем в наш canvas скриншот - iframe
                    destCtx.drawImage(screen_frame_image, window.innerWidth - frame_rect.width - 16, window.innerHeight - frame_rect.height - 16);
                };
                screen_frame_image.src = screenShotFrame;
            }
            // перо для рисования на скрине
            destCtx.lineCap = 'round';
            destCtx.lineWidth = 8;
            destCtx.strokeStyle = "rgba(255,255,0, 0.5)";
            let prevX = 0;
            let prevY = 0;
            // рисуем на канвасе при движении мыши
            canvas.onmousemove = (e) => {
                let x = e.offsetX;
                let y = e.offsetY;
                // explorer не поддерживает movementX movementY - эмулируем
                let movementX = (prevX ? e.screenX - prevX : 0)
                let movementY = (prevY ? e.screenY - prevY : 0)
                prevX = e.screenX;
                prevY = e.screenY;

                let dx = e.movementX || movementX;
                let dy = e.movementY || movementY;
                //если нажата кнопка мыши, рисуем
                if (e.buttons > 0) {
                    destCtx.beginPath();
                    destCtx.moveTo(x, y);
                    destCtx.lineTo(x - dx, y - dy);
                    destCtx.stroke();
                    destCtx.closePath();
                }
            };
        }
        // закрываем окно
        cancel_button.onclick = () => {
            textarea_div.style.visibility = "hidden";
            text_area.value = "";
        };
        button_div.onclick = () => {
            textarea_div.style.visibility = "visible";
        };
        // клик по кнопке отправки данных
        submit_button.onclick = async () => {
            button_div.style.visibility = "hidden";
            textarea_div.style.visibility = "hidden";
            let activeFrame = getActiveFrame();
            // или скрина с нарисованным на канвасе или новый скрин окна
            this._screenshot ||= await getScreenShot(activeFrame.body);
            this._url = activeFrame.url;
            this._serverEnvironment = await getVersionFromActuator(activeFrame.url);
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

    screenshot() {
        console.log('get edited screenshot');
        return this._screenshot;
    }

    url() {
        console.log('get iframe url');
        return this._url;
    }

    serverEnvironment() {
        console.log('get server environment');
        return this._serverEnvironment;
    }

    clientEnvironment() {
        console.log('get client environment');
        return getEnvironment();
    }
}