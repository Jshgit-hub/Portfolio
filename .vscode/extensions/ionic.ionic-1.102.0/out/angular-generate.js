"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.angularGenerate = void 0;
const utilities_1 = require("./utilities");
const logging_1 = require("./logging");
const path_1 = require("path");
const fs_1 = require("fs");
const analyzer_1 = require("./analyzer");
const vscode_1 = require("vscode");
const ionic_tree_provider_1 = require("./ionic-tree-provider");
const node_commands_1 = require("./node-commands");
const rules_angular_json_1 = require("./rules-angular-json");
async function angularGenerate(queueFunction, project, angularType) {
    var _a;
    let name = await vscode_1.window.showInputBox({
        title: `New Angular ${angularType}`,
        placeHolder: `Enter name for new ${angularType}`,
    });
    if (!name || name.length < 1)
        return;
    queueFunction();
    // CREATE src/app/test2/test2.component.ts
    try {
        let args = '';
        if ((0, analyzer_1.isGreaterOrEqual)('@angular/core', '15.0.0')) {
            if ((0, analyzer_1.isGreaterOrEqual)('@ionic/angular-toolkit', '8.1.0')) {
                if (angularType == 'page') {
                    args += ' --standalone';
                }
            }
            if ((0, analyzer_1.isGreaterOrEqual)('@ionic/angular-toolkit', '11.0.1')) {
                if (angularType == 'component') {
                    args += ' --standalone';
                }
            }
        }
        name = (0, utilities_1.replaceAll)(name, ' ', '-').trim();
        (0, logging_1.writeIonic)(`Creating Angular ${angularType} named ${name}..`);
        (0, rules_angular_json_1.checkAngularJson)(project);
        const angularProjectName = (_a = ionic_tree_provider_1.ionicState.project) !== null && _a !== void 0 ? _a : 'app';
        // eg ng generate page page-a --standalone --project=app
        let cmd = `${(0, node_commands_1.npx)(project)} ng generate ${angularType} ${name}${args} --project=${angularProjectName}`;
        if (angularType == 'directive') {
            cmd += ` --skip-import`;
        }
        (0, logging_1.write)(`> ${cmd}`);
        const out = await (0, utilities_1.getRunOutput)(cmd, project.projectFolder());
        (0, logging_1.write)(out);
        const src = (0, utilities_1.getStringFrom)(out, 'CREATE ', '.ts');
        const path = (0, path_1.join)(project.projectFolder(), src + '.ts');
        if (!src || !(0, fs_1.existsSync)(path)) {
            (0, logging_1.writeError)(`Failed to create Angular ${angularType} named ${name}`);
        }
        else {
            (0, logging_1.writeIonic)(`Created Angular ${angularType} named ${name}`);
            await (0, utilities_1.openUri)(path);
        }
    }
    catch (err) {
        (0, logging_1.writeError)(`Unable to generate Angular ${angularType} named ${name}: ${err}`);
    }
}
exports.angularGenerate = angularGenerate;
//# sourceMappingURL=angular-generate.js.map