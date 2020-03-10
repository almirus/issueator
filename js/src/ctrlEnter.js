import {CtrlEnterWidget} from "./class/ctrlEnterWidget";
import './css/ctrlEnterWidget.css';

document.addEventListener("DOMContentLoaded", () => {
    let widget = new CtrlEnterWidget();
    widget.render();
    document.addEventListener('keydown', (event) => {
        let key = event.which;
        if (event.ctrlKey && key === 13) {
            widget.show();
        }
    }, false);
});