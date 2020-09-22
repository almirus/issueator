import {AUTO_SCREENSHOT_FLAG} from "./const";
import html2canvas from "html2canvas";

export async function getScreenShot(selector=document.body) {
    let img = undefined;
    if (AUTO_SCREENSHOT_FLAG) {
        img = Promise.all([html2canvas(selector).then(canvas => {
            return canvas.toDataURL("image/png");
        })]);
    }
    console.log('screen ready!');
    return img;
}