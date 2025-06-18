"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setWebConfig = exports.getWebConfiguration = exports.WebConfigSetting = void 0;
const vscode_1 = require("vscode");
const workspace_state_1 = require("./workspace-state");
const context_variables_1 = require("./context-variables");
var WebConfigSetting;
(function (WebConfigSetting) {
    WebConfigSetting["nexus"] = "WebConfigNexusBrowser";
    WebConfigSetting["browser"] = "WebConfigWebBrowser";
    WebConfigSetting["editor"] = "WebConfigEditor";
    WebConfigSetting["none"] = "WebConfigNone";
})(WebConfigSetting = exports.WebConfigSetting || (exports.WebConfigSetting = {}));
function getWebConfiguration() {
    const setting = (0, workspace_state_1.getSetting)(workspace_state_1.WorkspaceSetting.webAction);
    if (setting) {
        return setting;
    }
    else {
        return WebConfigSetting.browser;
    }
}
exports.getWebConfiguration = getWebConfiguration;
async function setWebConfig(setting) {
    (0, workspace_state_1.setSetting)(workspace_state_1.WorkspaceSetting.webAction, setting);
    vscode_1.commands.executeCommand(context_variables_1.VSCommand.setContext, context_variables_1.Context.webConfig, setting);
}
exports.setWebConfig = setWebConfig;
//# sourceMappingURL=web-configuration.js.map