import { loadLocale, getLocalizedText } from "./utils/locales";
import { getWidgets, WidgetCategory, WidgetID, CategoryFilterWidget } from "./utils/widgetBuilder";
import { widgetDrag, checkWidgetSpace, enterWidgetEditor, exitWidgetEditor } from "./utils/widgetEditorMode"
import { Settings, isEnabled, getValue, updateSetting } from "./utils/settings";

document.addEventListener("DOMContentLoaded", () => {
  init();
});

function init() {
  const background = document.getElementById("background");

  if (background) {
    const value = getValue(Settings.Background);
    if (value) {
    background.setAttribute("src", value);
    };
  };

  if (isEnabled(Settings.EnableAnimations)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./assets/styles/animations.css";
    document.head.appendChild(link);
  };

  if (isEnabled(Settings.SettingsButtonVisible)) {
    const settings_button = document.createElement("button");
    settings_button.id = "settings-button";

    settings_button.title = getLocalizedText("settings-tooltip");

    const namescape = "http://www.w3.org/2000/svg";
    const icon = document.createElementNS(namescape, "svg");
    icon.setAttribute("xmlns", namescape);
    icon.setAttribute("viewBox", "0 0 512 512");
    icon.setAttribute("width", "24");
    icon.setAttribute("height", "24");
    const path = document.createElementNS(namescape, "path");
    path.setAttribute(
      "d",
      "M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
    );
    icon.appendChild(path);

    settings_button.appendChild(icon);

    settings_button.onclick = () => {
      const settings_menu_container = document.getElementById(
        "settings-menu-container"
      );

      if (settings_menu_container) {
        if (settings_menu_container.classList.contains("active")) {
            hideSettingsMenu();
        } else if (!settings_menu_container.classList.contains("active")) {
            showSettingsMenu();
        }
      } else if (!settings_menu_container) {
        createSettingsMenu();
      };
    };

    document.body.appendChild(settings_button);
  };

  if (isEnabled(Settings.WidgetsButtonVisible)) {
    const widgets_button = document.createElement("button");
    widgets_button.id = "widgets-button";

    widgets_button.title = getLocalizedText("widgets-tooltip");

    const namescape = "http://www.w3.org/2000/svg";
    const icon = document.createElementNS(namescape, "svg");
    icon.setAttribute("xmlns", namescape);
    icon.setAttribute("viewBox", "0 0 512 512");
    icon.setAttribute("width", "24");
    icon.setAttribute("height", "24");
    const path = document.createElementNS(namescape, "path");
    path.setAttribute(
      "d",
      "M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
    );
    icon.appendChild(path);

    widgets_button.appendChild(icon);

    widgets_button.onclick = () => {
      const widgets_menu_container = document.getElementById(
        "widgets-menu-container"
      );

      if (widgets_menu_container) {
        if (widgets_menu_container.classList.contains("active")) {
            hideWidgetsMenu();
        } else if (!widgets_menu_container.classList.contains("active")) {
            showWidgetsMenu();
        }
      } else if (!widgets_menu_container) {
        createWidgetsMenu();
      };
    };

    document.body.appendChild(widgets_button);
  };

  for (let id = 1; id <= 25; id++) {
    createWidgetArea(id);
  };

  document.addEventListener("click", closeAllOpened);
};

function createWidgetArea(id: number) {
  const widget_area = document.createElement("div");
  widget_area.className = "widget-area";
  widget_area.id = `widget-area-${id}`;

  // widget_area.innerHTML = `<p class="text">${id}</p>`;

  const widgets_overlay = document.getElementById("widgets-overlay");

  if (widgets_overlay) {
    widgets_overlay.appendChild(widget_area);
  };
};

function createWidgetsMenu() {
  const widgets_menu_container = document.createElement("div");
  widgets_menu_container.id = "widgets-menu-container";
  widgets_menu_container.className = "show-widgets-menu-container";

  const title = document.createElement("p");
  title.className = "menu-title text";
  title.textContent = "Widgets";

  const comment = document.createElement("p");
  comment.className = "menu-comment text";
  comment.textContent = "Just drag and drop widgets!";

  const menu_category_filter = CategoryFilterWidget(WidgetCategory.All);

  menu_category_filter.onclick = () => {
    const menu_category_container = document.getElementById("menu-category-container");
    if (menu_category_container) {
      menu_category_container.remove();
    } else if (!menu_category_container) {
      showWidgetsCategory();
    };
  };

  const widgets_container = document.createElement("div");
  widgets_container.id = "widgets-container";

  widgets_menu_container.appendChild(title);
  widgets_menu_container.appendChild(comment);
  widgets_menu_container.appendChild(menu_category_filter);
  
  getWidgets(WidgetCategory.All).forEach((widget) => {
    const widget_object = document.createElement("div");
    widget_object.classList.add(widget.className);
    widget_object.innerHTML = widget.content;
    widget_object.style.userSelect = "none";
    widget_object.setAttribute("draggable", "true");

    widget_object.addEventListener("dragstart", () => {
      widgetDrag(widget_object, widget.id);
    });

    widget_object.addEventListener("dragend", () => {
      widget_object.style.opacity = "1";

      exitWidgetEditor();
    });

    widgets_container.appendChild(widget_object);
  });

  widgets_menu_container.appendChild(widgets_container);

  document.body.appendChild(widgets_menu_container);
};

function createSettingsMenu() {
  const settings_menu_container = document.createElement("div");
  settings_menu_container.id = "settings-menu-container";
  settings_menu_container.className = "show-settings-menu-container";

  const title = document.createElement("p");
  title.className = "menu-title text";
  title.textContent = "Settings";

  const comment = document.createElement("p");
  comment.className = "menu-comment text";
  comment.textContent = "Modify the behavior";

  settings_menu_container.appendChild(title);
  settings_menu_container.appendChild(comment);

  document.body.appendChild(settings_menu_container);
};

function showWidgetsMenu() {
  const widgets_menu_container = document.getElementById(
    "widgets-menu-container"
  );

  if (widgets_menu_container && isEnabled(Settings.EnableAnimations)) {
    widgets_menu_container.className = "show-widgets-menu-container";
  } else if (widgets_menu_container && !isEnabled(Settings.EnableAnimations)) {
    widgets_menu_container.remove();
  };

  widgets_menu_container?.classList.add("active");
};

function hideWidgetsMenu() {
  const widgets_menu_container = document.getElementById(
    "widgets-menu-container"
  );

  if (widgets_menu_container && isEnabled(Settings.EnableAnimations)) {
    widgets_menu_container.className = "hide-widgets-menu-container";
  } else if (widgets_menu_container && !isEnabled(Settings.EnableAnimations)) {
    widgets_menu_container.remove();
  };

  widgets_menu_container?.classList.remove("active");
};

function showSettingsMenu() {
  const settings_menu_container = document.getElementById(
    "settings-menu-container"
  );

  if (settings_menu_container && isEnabled(Settings.EnableAnimations)) {
    settings_menu_container.className = "show-settings-menu-container";
  } else if (settings_menu_container && !isEnabled(Settings.EnableAnimations)) {
    settings_menu_container.remove();
  };

  settings_menu_container?.classList.add("active");
};

function hideSettingsMenu() {
  const settings_menu_container = document.getElementById(
    "settings-menu-container"
  );

  if (settings_menu_container && isEnabled(Settings.EnableAnimations)) {
    settings_menu_container.className = "hide-settings-menu-container";
  } else if (settings_menu_container && !isEnabled(Settings.EnableAnimations)) {
    settings_menu_container.remove();
  };

  settings_menu_container?.classList.remove("active");
};

function closeAllOpened(event: MouseEvent) {
  const widgets_menu_container = document.getElementById(
    "widgets-menu-container"
  );
  const settings_menu_container = document.getElementById(
    "settings-menu-container"
  );

  const container = document.getElementById("container");

  if (container && container.contains(event.target as Node)) {
    if (widgets_menu_container) {
      hideWidgetsMenu();
    };
    if (settings_menu_container) {
      hideSettingsMenu();
    };
  };
};

function showWidgetsCategory() {
  const menu_category_filter = document.getElementById("menu-category-filter");

  if (menu_category_filter) {
    const menu_category_container = document.createElement("div");
    menu_category_container.id = "menu-category-container";
    menu_category_container.className = "show-menu-category-container";
    menu_category_filter.append(menu_category_container);

    Object.values(WidgetCategory).forEach(category => {
      const category_div = document.createElement("div");
      category_div.className = "category-div";
      category_div.innerText = getLocalizedText(category);

      category_div.addEventListener("click", (e) => {
        e.stopPropagation();
      });

      category_div.addEventListener("click", () => {
        const widgets_container = document.getElementById("widgets-container");
        if (widgets_container) {
          widgets_container.innerHTML = "";
          CategoryFilterWidget(category);
          menu_category_container.remove();
          
          getWidgets(category).forEach((widget) => {
            const widget_object = document.createElement("div");
            widget_object.classList.add(widget.className);
            widget_object.innerHTML = widget.content;
            widget_object.style.userSelect = "none";
            widget_object.setAttribute("draggable", "true");
        
            widget_object.addEventListener("dragstart", () => {
              widgetDrag(widget_object, widget.id);
            });

            widget_object.addEventListener("dragend", () => {
              widget_object.style.opacity = "1";

              exitWidgetEditor();
            });
        
            widgets_container.appendChild(widget_object);
          });
        };
      });
      menu_category_container.appendChild(category_div);
    });
  };
};

export { showWidgetsMenu, hideWidgetsMenu}