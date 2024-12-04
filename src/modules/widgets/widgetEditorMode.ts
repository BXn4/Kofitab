import { hideWidgetsMenu, showWidgetsMenu } from "../../main"
import { WidgetCategory, Widgets, Widget } from "./widgetBuilder";
import { EditorIcons } from "../../utils/icons";

import { updateTime } from "./components/time";

let editor_mode = false;

function widgetDrag(widget: Widget, widget_object: HTMLElement) {
  widget_object.style.opacity = "0.3";

  checkWidgetSpace(widget, widget_object);

  enterWidgetEditor();

  widget_object.addEventListener("dragend", () => {
      widget_object.style.opacity = "1";

      if (!editor_mode) {
       exitWidgetEditor();
      };
  });
};

function enterWidgetEditor() {
  if (document.getElementById("exit-widgets-editor-mode")) {
    return;
  };

  const widget_areas = document.querySelectorAll(".widget-area");

  widget_areas.forEach(widget => {
      widget.className = "widget-area-visible";
  });

  const cancel_widget_drag = document.createElement("div");
  cancel_widget_drag.id = "cancel-widget-drag";

  const drag_drop_remove = document.createElement("p");
  drag_drop_remove.textContent = "Drag and drop here to remove the widget";
  drag_drop_remove.className = "text";

  cancel_widget_drag.appendChild(drag_drop_remove);

  const overlay_top_area = document.createElement("div");
  overlay_top_area.id = "overlay-top-area";

  if (editor_mode) {
    const widgets_editor_mode = document.createElement("button");
    widgets_editor_mode.className = "widgets-editor-mode-button text"
    widgets_editor_mode.id = "exit-widgets-editor-mode";
    widgets_editor_mode.textContent = "Exit editor";
  
    widgets_editor_mode.onclick = () => {
      exitWidgetEditor();
      editorMode(false);
    };

    overlay_top_area.appendChild(widgets_editor_mode);
  };

  document.body.appendChild(overlay_top_area);
  document.body.appendChild(cancel_widget_drag);

  if (!editor_mode) {
    hideWidgetsMenu();
  } else if (editor_mode) {
    /*
    const customization_buttons = [
      { id: "maximize-button", icon: EditorIcons.maximize, label: "Maximize", class: "customization-maximize" },
      { id: "minimize-button", icon: EditorIcons.minimize, label: "Minimize", class: "customization-minimize"  },
      { id: "move-button", icon: EditorIcons.move, label: "Move", class: "customization-move" },
      { id: "move-up-button", icon: EditorIcons.move_up, label: "Move Up", class: "customization-move-up" },
      { id: "move-down-button", icon: EditorIcons.move_down, label: "Move Down", class: "customization-move-down" },
      { id: "change-font-button", icon: EditorIcons.change_font, label: "Change Font", class: "customization-change-font" },
      { id: "change-color-button", icon: EditorIcons.change_color, label: "Change Color", class: "customization-change-color" },
      { id: "change-fill-button", icon: EditorIcons.change_background_fill, label: "Change Background Fill", class: "customization-change-fill" },
  ];
  
  const widgets = document.querySelectorAll('[id^="w-"]');

  widgets.forEach((widget) => {
      const customization_container = document.createElement('div');
      customization_container.id = "customization-container";

      customization_buttons.forEach(customization => {
          const button = document.createElement("button");
          button.id = customization.id;
          button.className = customization.class;
          button.setAttribute("aria-label", customization.label);

          const icon = new DOMParser().parseFromString(customization.icon, 'image/svg+xml').documentElement;
          icon.setAttribute('width', "24");
          icon.setAttribute('height', "24");
          button.appendChild(icon);

          customization_container.appendChild(button);

          widget.appendChild(customization_container);
      });
  }); */
};
};

function exitWidgetEditor() {
  const widget_areas = document.querySelectorAll(".widget-area-visible");

  widget_areas.forEach(widget => {
      widget.className = "widget-area";
      // Fastest way to remove all event listeners
      // https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
      widget.replaceWith(widget.cloneNode(true));
  });

  const cancel_widget_drag = document.getElementById("cancel-widget-drag");
  const widgets_editor_mode = document.getElementById("exit-widgets-editor-mode");

  cancel_widget_drag?.remove();
  widgets_editor_mode?.remove();

  if (!editor_mode) {
    showWidgetsMenu();
  };
};

function checkWidgetSpace(widget: Widget, widget_object: HTMLElement) {
  const widget_areas = document.querySelectorAll<HTMLElement>(".widget-area, .widget-area-visible");

  widget_areas.forEach(widget_area => {
      function dragWidgetOver(e: DragEvent) {
          if (widget_area.className === "widget-area-selected") {
              e.preventDefault();
              return;
          } else {
              widget_area.className = "widget-area-selected";
              e.preventDefault();
          };
      };

      function dragWidgetOverLeave(e: DragEvent) {
          widget_area.className = ("widget-area-visible");
      };

      function dropWidget(e: DragEvent) {
          console.log(`Placed widget: ${widget.id} in: ${widget_area.id}`)
          widget_area.className = ("widget-area-visible");
          e.preventDefault();

          renderWidget(widget, widget_area);
      };

      widget_area.addEventListener("dragover", dragWidgetOver);
      widget_area.addEventListener("dragleave", dragWidgetOverLeave);
      widget_area.addEventListener("drop", dropWidget);
  });
};

function renderWidget(widget: Widget, area: HTMLElement) {
  console.log(`Rendering widget: ${widget.id} over: ${area.id}`);

  const new_widget_id = `w-${new Date().getTime().toString()}`;
  const new_widget = document.createElement('div');
  new_widget.id = new_widget_id;

  if (widget.style) {
      Object.entries(widget.style).forEach(([key, value]) => {
          if (value) {
              (new_widget.style as any)[key.replace("_", "-")] = value.toString();
          };
      });
  };

  area.innerHTML = "";

  widget.area = area.id;
  widget.id = new_widget.id;

  saveWidget({
    id: widget.id,
    type: widget.type,
    category: widget.category,
    className: widget.className,
    content: widget.content,
    style: widget.style,
    properties: widget.properties,
    area: widget.area,
  });

  if (widget.category === WidgetCategory.Time) {
    area.appendChild(new_widget);
    updateTime(widget, new_widget_id);
    setInterval(() => updateTime(widget, new_widget_id), 1000);
  } else {
    new_widget.innerHTML = widget.content;
    area.appendChild(new_widget);
  };
  
};

function saveWidget(widget: Widget) {
  const widgets = JSON.parse(localStorage.getItem('widgets') || '[]');
  widgets.push(widget);
  localStorage.setItem('widgets', JSON.stringify(widgets));
};

function placeWidgets() {
  const widgets: Widget[] = JSON.parse(localStorage.getItem('widgets') || '[]');

  widgets.forEach((widget: Widget) => {
    if (widget.area) {
      const widget_area = document.getElementById(widget.area);

      if (widget_area) {
        console.log(`Placed widget: ${widget.id}, in area: ${widget.area}`);
        
        const new_widget = document.createElement('div');
        new_widget.id = widget.id;

        if (widget.style) {
          Object.entries(widget.style).forEach(([key, value]) => {
            if (value) {
              (new_widget.style as any)[key.replace("_", "-")] = value.toString();
            };
          });
        };

        widget_area.innerHTML = "";

        if (widget.category === WidgetCategory.Time) {
          widget_area.appendChild(new_widget);
          updateTime(widget, widget.id);
          setInterval(() => updateTime(widget, widget.id), 1000);
        } else {
          // BAD QUICK FIX !!
          new_widget.innerHTML = widget.content;
          widget_area.appendChild(new_widget);
        };
      };
    };
  });
};

function editorMode(value: boolean) {
  editor_mode = value;
};

export { widgetDrag, checkWidgetSpace, enterWidgetEditor, exitWidgetEditor, editorMode, placeWidgets }