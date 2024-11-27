export const TimeWidget = `<p id="time-widget">${new Date().toLocaleTimeString()}</p>`;
import { WidgetStyle } from "../widgetBuilder"


export const BasicTimeStyle: WidgetStyle = {
    font_family: "Caviar Dreams",
    font_size: "62px",
    display: "flex",
    justify_content: "center",
    align_items: "center",
    text_align: "center",
    color: "white",
};

setInterval(() => {
    const timeWidget = document.getElementById("time-widget");
    if (timeWidget) {
        timeWidget.innerHTML = new Date().toLocaleTimeString();
    }
}, 1000);