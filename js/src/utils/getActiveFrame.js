import {IFRAME_SELECTOR} from "./const";

// ищем в DOM активный (открытый) iframe если не найдем возвращаем основное окно
// специфично для jepria gwt приложений
export function getActiveFrame() {
    let result = document;
    let url = document.URL;
    Array.from(document.getElementsByClassName(IFRAME_SELECTOR)).forEach(element => {
        if (element.nodeName === 'IFRAME') {
            if (element.parentElement.nodeName === 'DIV') {
                if (element.parentElement.parentElement?.nodeName === 'DIV' && element.parentElement.parentElement.className === 'gwt-TabLayoutPanelContent') {
                    if (element.parentElement.parentElement?.parentElement?.nodeName === 'DIV' && element.parentElement.parentElement.parentElement.style.display !== 'none') {
                        result = element.contentWindow.document;
                        url = element.contentWindow.location.href
                        console.log('active iFrame was found');
                    }
                }
            }
        }
    })
    return {
        url: url,
        document: result
    };
}