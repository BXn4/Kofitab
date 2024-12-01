import { WidgetStyle, WidgetProperties, WidgetID, Widgets } from "../widgetBuilder"

export const BasicTimeStyle: WidgetStyle = {
    font_family: "Caviar Dreams",
    font_size: "62px",
    display: "flex",
    justify_content: "center",
    align_items: "center",
    text_align: "center",
    color: "white",
};

export const BasicTimeProperties: WidgetProperties = {
    Time: {
        timeFormat: 24,
        separator: ":",
        showSeconds: false,
    },
};

function getTime(widgetID: WidgetID): string {
    const now = new Date();
    let current_hours = now.getHours();
    let current_minutes = now.getMinutes();
    let current_seconds = now.getSeconds();
    let ampm = '';

    const widget = Widgets.find(w => w.id === widgetID);

    if (widget?.properties?.Time?.timeFormat === 12) {
        ampm = current_hours >= 12 ? 'PM' : 'AM';
        current_hours = current_hours % 12 || 12;
    };

    const hour = current_hours.toString().padStart(2, '0');
    const minute = current_minutes.toString().padStart(2, '0');
    const second = current_seconds.toString().padStart(2, '0');

    return `${hour}${widget?.properties?.Time?.separator}${minute}${widget?.properties?.Time?.showSeconds ? `${widget?.properties?.Time?.separator}${second}` : ''}`;
};

function updateTime(widget: WidgetID, id: string) {
    const timeWidget = document.getElementById(id);

    if (timeWidget) {
        timeWidget.innerHTML = getTime(widget);
    };
};

export const TimeWidget = (id?: string): string => `<p id="${id}">12:00</p>`;

export { updateTime, getTime }