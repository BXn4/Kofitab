import { hideWidgetsMenu, showWidgetsMenu } from "../../main"
import { WidgetID, Widgets } from "./widgetBuilder";

let editor_mode = false;

function widgetDrag(widgetID: WidgetID, widget_object: HTMLElement) {
  widget_object.style.opacity = "0.3";

  checkWidgetSpace(widgetID, widget_object);

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

function checkWidgetSpace(widgetID: WidgetID, widget_object: HTMLElement) {
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
          console.log(`Placed widget: ${widgetID} in: ${widget_area.id}`)
          widget_area.className = ("widget-area-visible");
          e.preventDefault();

          renderWidget(widgetID, widget_area);
      };

      widget_area.addEventListener("dragover", dragWidgetOver);
      widget_area.addEventListener("dragleave", dragWidgetOverLeave);
      widget_area.addEventListener("drop", dropWidget);
  });
};

function renderWidget(widgetID: WidgetID, area: HTMLElement) {
  const widget = Widgets.find(w => w.id === widgetID);
  if (widget) {
      console.log(`Rendering widget: ${widget.id} over: ${area.id}`);

      const new_widget = document.createElement('div');
      new_widget.id = `${widget.id}-${new Date().getTime().toString()}`;

      if (widget.style) {
        Object.entries(widget.style).forEach(([key, value]) => {
            if (value) {
                (new_widget.style as any)[key.replace("_", "-")] = value.toString();
            };
        });
    };

    area.innerHTML = "";

    new_widget.innerHTML = widget.content;

    area.appendChild(new_widget);
  };
};

function editorMode(value: boolean) {
  editor_mode = value;
};

export { widgetDrag, checkWidgetSpace, enterWidgetEditor, exitWidgetEditor, editorMode }