import { loadLocale, getLocalizedText } from "./utils/locales";
import { getWidgets, WidgetCategory, CategoryFilterWidget } from "./modules/widgets/widgetBuilder";
import { enterWidgetEditor, widgetDrag, editorMode } from "./modules/widgets/widgetEditorMode"
import { Settings, isEnabled, getValue, updateSetting } from "./utils/settings";
import { BasicIcons } from "./utils/icons";

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

  /* if (isEnabled(Settings.FirstStart)) {
    const first_start_container = document.createElement("div");
    first_start_container.id = "first-start-container";

    const welcome_title = document.createElement("p");
    welcome_title.id = "first-start-title";
    welcome_title.textContent = "Welcome to Kofizen!";
    welcome_title.className = "text";

    first_start_container.appendChild(welcome_title);

    document.body.appendChild(first_start_container);

  }; */

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

    const icon = new DOMParser().parseFromString(BasicIcons.settings, 'image/svg+xml').documentElement;
    icon.setAttribute('width', "24");
    icon.setAttribute('height', "24");
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

    const icon = new DOMParser().parseFromString(BasicIcons.menu, 'image/svg+xml').documentElement;
    icon.setAttribute('width', "24");
    icon.setAttribute('height', "24");
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

  const menu_bottom_area = document.createElement("div");
  menu_bottom_area.id = "menu-bottom-area";

  const widgets_editor_mode = document.createElement("button");
  widgets_editor_mode.className = "widgets-editor-mode-button text"
  widgets_editor_mode.id = "enter-widgets-editor-mode";
  widgets_editor_mode.textContent = "Editor";

  widgets_editor_mode.onclick = () => {
    editorMode(true);
    enterWidgetEditor();
  };

  menu_bottom_area.appendChild(widgets_editor_mode);

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
      widgetDrag(widget.id, widget_object);
    });

    widgets_container.appendChild(widget_object);
  });

  widgets_menu_container.appendChild(widgets_container);
  widgets_menu_container.appendChild(menu_bottom_area);

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
              widgetDrag(widget.id, widget_object);
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