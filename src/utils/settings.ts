interface Setting {
    setting: Settings;
    category: SettingsCategory;
    enabled: boolean;
    type: SettingType;
    value?: string;
};

enum Settings {
    EnableAnimations = "enable_animations",
    SettingsButtonVisible = "settings_button_visible",
    WidgetsButtonVisible = "widgets_button_visible",
    Background = "background",
};

enum SettingsCategory {
    General = "General",
};

enum SettingType {
    Toggle = "Toggle",
    Input = "Input"
};

// DEFAULT
const configuration: Setting[] = [
    {
        setting: Settings.EnableAnimations,
        category: SettingsCategory.General,
        enabled: true,
        type: SettingType.Toggle,
    },
    {
        setting: Settings.SettingsButtonVisible,
        category: SettingsCategory.General,
        enabled: true,
        type: SettingType.Toggle,
    },
    {
        setting: Settings.WidgetsButtonVisible,
        category: SettingsCategory.General,
        enabled: true,
        type: SettingType.Toggle,
    },
    {
        setting: Settings.Background,
        category: SettingsCategory.General,
        enabled: true,
        type: SettingType.Input,
        value: "./assets/images/backgrounds/default.jpg"
    },
];

function updateSetting(setting: Settings, value: boolean | string) {
    const config = configuration.find((s) => s.setting === setting);
    if (config) {
        if (typeof value == 'boolean') {
            config.enabled = value;
        };

        if (typeof value == 'string') {
            config.value = value;
        };
    };
};

function isEnabled(settings: Settings) {
    const setting = configuration.find((s) => s.setting === settings);
    if (setting) {
        return setting.enabled;
    };
};

function getValue(settings: Settings) {
    const setting = configuration.find((s) => s.setting === settings);
    if (setting) {
        return setting.value;
    };
};

export { SettingType, SettingsCategory, Settings, isEnabled, getValue, updateSetting };