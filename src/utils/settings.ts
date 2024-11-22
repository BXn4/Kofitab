interface Setting {
    type: SettingType;
    className: string;
    content: string;
};

enum SettingType {
    Text = "Text",
    Toggle = "Toggle",
};

enum SettingContent {
    Text = '<p class="text">Object</p>',
    Toggle = '<label class="switch"><input type="checkbox" class="checkbox" id="{id}" checked><span class="slider round"></span></label>',
};

const config = {
    animationsEnabled: true,
    settingsButtonVisible: true,
    widgetsButtonVisible: true,
    background: "./assets/images/backgrounds/default.jpg",
};

function createToggle(id: string, checked: boolean): string {
    const toggle = SettingContent.Toggle;
    return toggle.replace('{id}', id).replace('checked', checked ? 'checked' : ''); 
};

function createSettings(key: string, value: any): string {
    let textContent = '';
    switch (key) {
        case "animationsEnabled":
            textContent = `Enable animations: ${createToggle(key, value)}`;
            break;
        case "settingsButtonVisible":
            textContent = `Hide settings icon: ${createToggle(key, value)}`;
            break;
        case "widgetsButtonVisible":
            textContent = `Hide widgets button: ${createToggle(key, value)}`;
            break;
        case "background":
            textContent = `${key}: ${value}`;
            break;
    };

    return `<p class="text">${textContent}</p>`;
};

const settings: Setting[] = Object.entries(config).map(([key, value]) => ({
    type: SettingType.Text,
    className: "setting-box",
    content: createSettings(key, value),
}));

export { config, settings };