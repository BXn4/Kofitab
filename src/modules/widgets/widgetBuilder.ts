import { TextWidget, BasicTextStyle } from "./components/text";
import { TimeWidget, BasicTimeStyle, BasicTimeProperties } from "./components/time";
import { DateWidget, BasicDateStyle } from "./components/date";
import { SearchWidget } from "./components/search";
import { CategoryFilterWidget } from "./components/filter";

interface Widget {
    id: string;
    type: WidgetType;
    category: WidgetCategory;
    className: string;
    content: string;
    style?: WidgetStyle;
    properties?: WidgetProperties;
    area?: string;
};

interface WidgetStyle {
    font_family?: string;
    font_size?: string;
    font_weight?: string;
    font_style?: "normal" | "italic" | "oblique",
    position?: string,
    display?: string,
    justify_content?: string,
    align_items?: string,
    top?: string,
    bottom?: string,
    left?: string,
    right?: string,
    color?: string;
    background_color?: string;
    text_align?: "left" | "center" | "right",
    border?: string;
    border_radius?: number;
    box_shadow?: string;
    width?: string;
    height?: string;
    opacity?: number;
    margin?: string;
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

enum WidgetID {
    BasicText = "BasicText",
    BasicTime = "BasicTime",
    BasicDate = "BasicDate",
    BasicSearh = "BasicSearch",
};

interface WidgetProperties {
    Time?: {
        timeFormat: 12 | 24;
        separator: string;
        showSeconds: boolean;
    };
};

const Widgets: Widget[] = [
    {
        id: WidgetID.BasicText,
        type: WidgetType.Text,
        category: WidgetCategory.Text,
        className: "widget-box",
        content: TextWidget,
        style: BasicTextStyle,
    },
    {
        id: WidgetID.BasicTime,
        type: WidgetType.Time,
        category: WidgetCategory.Time,
        className: "widget-box",
        content: TimeWidget(),
        style: BasicTimeStyle,
        properties: BasicTimeProperties,
    },
    {
        id: WidgetID.BasicDate,
        type: WidgetType.Date,
        category: WidgetCategory.Date,
        className: "widget-box",
        content: DateWidget,
        style: BasicDateStyle,
    },
    {
        id: WidgetID.BasicSearh,
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

export { Widgets,  getWidgets, WidgetCategory, WidgetID, CategoryFilterWidget, WidgetStyle, WidgetProperties, Widget };