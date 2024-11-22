import { TextWidget } from "./widgets/text";
import { TimeWidget } from "./widgets/time";
import { DateWidget } from "./widgets/date";
import { SearchWidget } from "./widgets/search";

enum WidgetType {
    Text = "Text",
    Time = "Time",
    Date = "Date",
    Search = "Search"
};

interface Widget {
    type: WidgetType;
    className: string;
    content: string;
};

function createWidgets(type: WidgetType): string {
    switch (type) {
        case WidgetType.Text:
            return TextWidget;
        case WidgetType.Time:
            return TimeWidget;
        case WidgetType.Date:
            return DateWidget;
        case WidgetType.Search:
            return SearchWidget;
    };
};

const widgets: Widget[] = Object.values(WidgetType).map(type => ({
    type,
    className: "widget-box",
    content: createWidgets(type),
}));

export { widgets };