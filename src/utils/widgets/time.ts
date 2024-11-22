export const TimeWidget = `<p class="text" id="time-widget">${new Date().toLocaleTimeString()}</p>`;

setInterval(() => {
    const timeWidget = document.getElementById("time-widget");
    if (timeWidget) {
        timeWidget.innerHTML = new Date().toLocaleTimeString();
    }
}, 1000);