import {addCSS} from "./dynamicCSS";
import {checkBrowserDependency} from "./checkBrowserDependency";

export function prepare() {
    addCSS();
    checkBrowserDependency();
}
