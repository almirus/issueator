import {AUTO_SCREENSHOT_FLAG} from "./const";
import html2canvas from "html2canvas";

export async function getScreenShot(selector = document.body) {
    let img = undefined;
    const config = {
        ignoreElements: function (element) {
            // на скрин не попадут полупрозрачные окна
            return element.classList.contains('gwt-PopupPanelGlass')
        }
    };
    if (AUTO_SCREENSHOT_FLAG) {
        img = Promise.all([html2canvas(selector, config).then(canvas => {
            return canvas.toDataURL("image/png");
        })]);
    }
    console.log('screen ready!');
    return img;
}