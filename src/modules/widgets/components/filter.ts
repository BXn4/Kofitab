import { WidgetCategory } from "../widgetBuilder";
import { getLocalizedText } from "../../../utils/locales"
import { BasicIcons } from "../../../utils/icons";

export function CategoryFilterWidget(category: WidgetCategory) {
  let menu_category_filter = document.getElementById("menu-category-filter");

  if (!menu_category_filter) {
    menu_category_filter = document.createElement("div");
    menu_category_filter.id = "menu-category-filter";
    menu_category_filter.className = "text";
  };

  menu_category_filter.textContent = getLocalizedText(category);

  const icon = new DOMParser().parseFromString(BasicIcons.filter, 'image/svg+xml').documentElement;
  icon.setAttribute('width', "24");
  icon.setAttribute('height', "24");
  menu_category_filter.appendChild(icon);

  return menu_category_filter;
};
