import {AUTO_SCREENSHOT_FLAG} from "./const";

export async function getScreenShot() {
    let img = '';
    if (AUTO_SCREENSHOT_FLAG) {
        let html2canvas = await import( /* webpackChunkName: "html2canvas" */ "html2canvas");
        html2canvas = html2canvas.default ? html2canvas.default : html2canvas;
        img = Promise.all([html2canvas(document.body).then(canvas => {
            return canvas.toDataURL("image/png");
        })]);
    }
    return img;
}