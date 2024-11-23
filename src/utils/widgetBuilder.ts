import { TextWidget } from "./widgets/text";
import { TimeWidget } from "./widgets/time";
import { DateWidget } from "./widgets/date";
import { SearchWidget } from "./widgets/search";
import { CategoryFilterWidget } from "./widgets/filter";

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
    All = "All",
    Text = "Text",
    Time = "Time",
    Date = "Date",
    Search = "Search",
    Weather = "Weather",
    Media = "Media",
};

const Widgets: Widget[] = [
    {
        type: WidgetType.Text,
        category: WidgetCategory.Text,
        className: "widget-box",
        content: TextWidget,
    },
    {
        type: WidgetType.Time,
        category: WidgetCategory.Time,
        className: "widget-box",
        content: TimeWidget,
    },
    {
        type: WidgetType.Date,
        category: WidgetCategory.Date,
        className: "widget-box",
        content: DateWidget,
    },
    {
        type: WidgetType.Search,
        category: WidgetCategory.Search,
        className: "widget-box",
        content: SearchWidget,
    },
];

function getWidgets(category: WidgetCategory): Widget[] {
    if (category === WidgetCategory.All) {
        return Widgets;
    };

    return Widgets.filter(widget => widget.category === category);
};

export { getWidgets, WidgetCategory, CategoryFilterWidget };