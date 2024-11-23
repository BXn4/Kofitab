import { TextWidget } from "./widgets/text";
import { TimeWidget } from "./widgets/time";
import { DateWidget } from "./widgets/date";
import { SearchWidget } from "./widgets/search";

interface Widget {
    type: WidgetType;
    category: WidgetCategory;
    className: string;
    content: string;
};

enum WidgetType {
    Text = "Text",
    Time = "Time",
    Date = "Date",
    Search = "Search",
};

enum WidgetCategory {
    Text = "Text",
    Time = "Time",
    Date = "Date",
    Search = "Search",
    Weather = "Weather",
    Music = "Music",
};

function createWidgets(type: WidgetType): { content: string; category: WidgetCategory } {
    switch (type) {
        case WidgetType.Text:
            return { content: TextWidget, category: WidgetCategory.Text };
        case WidgetType.Time:
            return { content: TimeWidget, category: WidgetCategory.Time };
        case WidgetType.Date:
            return { content: DateWidget, category: WidgetCategory.Date };
        case WidgetType.Search:
            return { content: SearchWidget, category: WidgetCategory.Search };
    }
}

const widgets: Widget[] = Object.values(WidgetType).map((type) => {
    const { content, category: WidgetCategory } = createWidgets(type);

    return {
        type,
        category: WidgetCategory,
        className: 'widget-box',
        content,
    };
});

export { widgets };