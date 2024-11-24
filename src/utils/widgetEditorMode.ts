import { hideWidgetsMenu, showWidgetsMenu } from "../main"
import { WidgetID } from "./widgetBuilder";

function widgetDrag(widget_object: HTMLElement, widget: WidgetID) {
    widget_object.style.opacity = "0.3";
  
    checkWidgetSpace(widget_object);
  
    enterWidgetEditor();
  };
  
  function enterWidgetEditor() {
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
    document.body.appendChild(cancel_widget_drag);
  
    hideWidgetsMenu();
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
                
    cancel_widget_drag?.remove();
    
    showWidgetsMenu();
  };
  
  function checkWidgetSpace(widget: HTMLElement) {
    const widget_areas = document.querySelectorAll<HTMLElement>(".widget-area");
  
    widget_areas.forEach(widget_area => {
      function dragWidgetOver(e: DragEvent) {
        e.preventDefault();
      };
  
      function dropWidget(e: DragEvent) {
        console.log(widget_area);
        e.preventDefault();
      };
  
      widget_area.addEventListener("dragover", dragWidgetOver);
      widget_area.addEventListener("drop", dropWidget);
    });
  };
  
export { widgetDrag, checkWidgetSpace, enterWidgetEditor, exitWidgetEditor}