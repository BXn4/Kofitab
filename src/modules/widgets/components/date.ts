import { WidgetStyle } from "../widgetBuilder"


export const DateWidget = `<p>${new Date().toLocaleDateString()}</p>`;

export const BasicDateStyle: WidgetStyle = {
    font_family: "Caviar Dreams",
    font_size: "32px",
    display: "flex",
    justify_content: "center",
    align_items: "center",
    text_align: "center",
    bottom: "40px",
    color: "white",
};