import {getEnvironment} from "./utils/environment";
import {send} from "./utils/sender";
import {DummyWidget} from "./class/dummyWidget";

document.addEventListener("DOMContentLoaded", () => {
    let widget = new DummyWidget();
    widget.render();
    widget.show();
    // создаем функцию обработчик
    widget.handleSend = async () => {
        let log = getEnvironment();
        let description = `
url: ${window.location.href}
time: ${new Date().toLocaleString()} (${Intl.DateTimeFormat().resolvedOptions().timeZone})
${log}`;
        // -----> отправка данных на сервис
        return await send({
            title: 'Автоматически созданная ошибка',
            description: description,
        })
    };
    // вызываем
    widget.handleSend().then(result => {
        console.log('handle event');
        if (result)
            console.log('is OK');
        else
            console.error('isn\'t OK')
    })
});