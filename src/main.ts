import { loadLocale, getLocalizedText } from "./utils/locales";
import { widgets } from "./utils/widgets";

const config = {
  animations: false,
  settingsButtonVisible: true,
  widgetsButtonVisible: true,
  background: "./assets/images/backgrounds/default.jpg"
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});

function init() {
  const background = document.getElementById("background");

  if (background) {
    background.setAttribute("src", config.background);
  };

  if (config.animations) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./assets/styles/animations.css";
    document.head.appendChild(link);
  };

  if (config.settingsButtonVisible) {
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
    document.body.appendChild(settings_button);
  };

  if (config.widgetsButtonVisible) {
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
      createWidgetsMenu();
    };

    document.body.appendChild(widgets_button);
  };
};

function createWidgetsMenu() {
  const widgets_menu_container = document.createElement("div");
  widgets_menu_container.id = "widgets-menu-container";
  widgets_menu_container.className = "show-widgets-menu-container"

  const title = document.createElement("p");
  title.className = "menu-title text";
  title.textContent = "Widgets";

  const comment = document.createElement("p");
  comment.className = "menu-comment text";
  comment.textContent = "Just drag and drop widgets!";

  widgets_menu_container.appendChild(title);
  widgets_menu_container.appendChild(comment);

  widgets.forEach(widget => {
    const widget_object = document.createElement("div");
    widget_object.classList.add(widget.className);
    widget_object.innerHTML = widget.content;
    widget_object.style.userSelect = "none";
    widget_object.setAttribute("draggable", "true");

    widget_object.addEventListener("dragstart", (e) => {
        e.dataTransfer?.setData("text", widget.type);
        widget_object.style.opacity = "0.3";

        hideWidgetsMenu();
    });

    widget_object.addEventListener("dragend", () => {
        widget_object.style.opacity = "1";

        showWidgetsMenu();
    });

    widgets_menu_container.appendChild(widget_object);
});

  document.body.appendChild(widgets_menu_container);
};

function showWidgetsMenu() {
  const widgets_menu_container = document.getElementById("widgets-menu-container");

  if (widgets_menu_container) {
    widgets_menu_container.className = "show-widgets-menu-container"
  };
};

function hideWidgetsMenu() {
  const widgets_menu_container = document.getElementById("widgets-menu-container");

  if (widgets_menu_container) {
    widgets_menu_container.className = "hide-widgets-menu-container"
  };
};