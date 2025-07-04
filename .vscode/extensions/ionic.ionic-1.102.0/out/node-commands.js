"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.npmRun = exports.npmUninstall = exports.npx = exports.npmUpdate = exports.npmInstallAll = exports.suggestInstallAll = exports.preflightNPMCheck = exports.addCommand = exports.npmInstall = exports.installForceArgument = exports.saveDevArgument = exports.listCommand = exports.outdatedCommand = exports.PMOperation = exports.PackageManager = void 0;
const vscode_1 = require("vscode");
const command_name_1 = require("./command-name");
const ionic_tree_provider_1 = require("./ionic-tree-provider");
const monorepo_1 = require("./monorepo");
const utilities_1 = require("./utilities");
const fs_1 = require("fs");
const workspace_state_1 = require("./workspace-state");
const analyzer_1 = require("./analyzer");
var PackageManager;
(function (PackageManager) {
    PackageManager[PackageManager["npm"] = 0] = "npm";
    PackageManager[PackageManager["yarn"] = 1] = "yarn";
    PackageManager[PackageManager["pnpm"] = 2] = "pnpm";
    PackageManager[PackageManager["bun"] = 3] = "bun";
})(PackageManager = exports.PackageManager || (exports.PackageManager = {}));
var PMOperation;
(function (PMOperation) {
    PMOperation[PMOperation["install"] = 0] = "install";
    PMOperation[PMOperation["installAll"] = 1] = "installAll";
    PMOperation[PMOperation["uninstall"] = 2] = "uninstall";
    PMOperation[PMOperation["update"] = 3] = "update";
    PMOperation[PMOperation["run"] = 4] = "run";
})(PMOperation = exports.PMOperation || (exports.PMOperation = {}));
function outdatedCommand(project) {
    switch (project.packageManager) {
        case PackageManager.yarn: {
            if (project.isYarnV1()) {
                return 'yarn outdated --json';
            }
            // Uses https://github.com/mskelton/yarn-plugin-outdated
            return 'yarn outdated --format=json';
        }
        case PackageManager.bun:
            return 'npm outdated --json';
        case PackageManager.pnpm:
            return 'pnpm outdated --json';
        default:
            return 'npm outdated --json';
    }
}
exports.outdatedCommand = outdatedCommand;
function listCommand(project) {
    switch (project.packageManager) {
        case PackageManager.yarn:
            return project.isYarnV1() ? 'yarn list --json' : 'yarn info --json';
        case PackageManager.pnpm:
            return 'pnpm list --json';
        case PackageManager.bun:
            return 'npm list --json';
        default:
            return 'npm list --json';
    }
}
exports.listCommand = listCommand;
function saveDevArgument(project) {
    switch (project.packageManager) {
        case PackageManager.yarn:
            return '--dev';
        default:
            return '--save-dev';
    }
}
exports.saveDevArgument = saveDevArgument;
function installForceArgument(project) {
    switch (project.packageManager) {
        case PackageManager.yarn:
            return '';
        default:
            return '--force';
    }
}
exports.installForceArgument = installForceArgument;
function npmInstall(name, ...args) {
    const argList = args.join(' ').trim();
    switch (ionic_tree_provider_1.ionicState.repoType) {
        case monorepo_1.MonoRepoType.npm:
            return `${pm(PMOperation.install, name)} ${argList} --workspace=${(0, monorepo_1.getMonoRepoFolder)(ionic_tree_provider_1.ionicState.workspace, undefined)}`;
        case monorepo_1.MonoRepoType.yarn:
        case monorepo_1.MonoRepoType.folder:
        case monorepo_1.MonoRepoType.lerna:
        case monorepo_1.MonoRepoType.pnpm:
            return command_name_1.InternalCommand.cwd + `${pm(PMOperation.install, name)} ${notForce(argList)}`;
        default:
            return `${pm(PMOperation.install, name)} ${notForce(argList)}`;
    }
}
exports.npmInstall = npmInstall;
function notForce(args) {
    if (ionic_tree_provider_1.ionicState.packageManager !== PackageManager.yarn)
        return args;
    return args.replace('--force', '');
}
// The package manager add command (without arguments)
function addCommand() {
    const a = pm(PMOperation.install, '*');
    return a.replace('*', '').replace('--save-exact', '').replace('--exact', '').trim();
}
exports.addCommand = addCommand;
/**
 * Check to see if we have node modules installed and return a command to prepend to any operations we may do
 * @param  {Project} project
 * @returns string
 */
function preflightNPMCheck(project) {
    const nmf = project.getNodeModulesFolder();
    const preop = !(0, fs_1.existsSync)(nmf) && !project.isModernYarn() ? npmInstallAll() + ' && ' : '';
    // If not set then set to a default value to prevent failrue
    if (!process.env.ANDROID_SDK_ROOT && !process.env.ANDROID_HOME && process.platform !== 'win32') {
        process.env.ANDROID_HOME = `~/Library/Android/sdk`;
        //preop = preop + 'export ANDROID_HOME=~/Library/Android/sdk && ';
    }
    return preop;
}
exports.preflightNPMCheck = preflightNPMCheck;
async function suggestInstallAll(project) {
    if (!ionic_tree_provider_1.ionicState || !ionic_tree_provider_1.ionicState.hasPackageJson) {
        return;
    }
    ionic_tree_provider_1.ionicState.hasNodeModulesNotified = true;
    if (project.isModernYarn()) {
        return;
    }
    if ((0, workspace_state_1.getGlobalSetting)(workspace_state_1.GlobalSetting.suggestNPMInstall) == 'no')
        return;
    const res = await vscode_1.window.showInformationMessage(`Would you like to install node modules for this project?`, 'Yes', 'No', 'Never');
    if (res == 'Never') {
        (0, workspace_state_1.setGlobalSetting)(workspace_state_1.GlobalSetting.suggestNPMInstall, 'no');
        return;
    }
    if (res != 'Yes')
        return;
    (0, utilities_1.showProgress)(`Installing....`, async () => {
        await project.runAtRoot(npmInstallAll());
        vscode_1.commands.executeCommand(command_name_1.CommandName.Refresh);
    });
}
exports.suggestInstallAll = suggestInstallAll;
function npmInstallAll() {
    switch (ionic_tree_provider_1.ionicState.repoType) {
        case monorepo_1.MonoRepoType.pnpm:
        case monorepo_1.MonoRepoType.lerna:
        case monorepo_1.MonoRepoType.folder:
            return command_name_1.InternalCommand.cwd + pm(PMOperation.installAll);
        default:
            return pm(PMOperation.installAll);
    }
}
exports.npmInstallAll = npmInstallAll;
function npmUpdate() {
    switch (ionic_tree_provider_1.ionicState.repoType) {
        case monorepo_1.MonoRepoType.pnpm:
        case monorepo_1.MonoRepoType.lerna:
        case monorepo_1.MonoRepoType.folder:
            return command_name_1.InternalCommand.cwd + pm(PMOperation.update);
        default:
            return pm(PMOperation.update);
    }
}
exports.npmUpdate = npmUpdate;
function pm(operation, name) {
    switch (ionic_tree_provider_1.ionicState.packageManager) {
        case PackageManager.npm:
            return npm(operation, name);
        case PackageManager.yarn:
            return yarn(operation, name);
        case PackageManager.pnpm:
            return pnpm(operation, name);
        case PackageManager.bun:
            return bun(operation, name);
        default:
            vscode_1.window.showErrorMessage('Unknown package manager');
    }
}
function yarn(operation, name) {
    switch (operation) {
        case PMOperation.installAll:
            return 'yarn install';
        case PMOperation.install:
            return `yarn add ${name} --exact`;
        case PMOperation.uninstall:
            return `yarn remove ${name}`;
        case PMOperation.run:
            return `yarn run ${name}`;
        case PMOperation.update:
            return `yarn update`;
    }
}
function npm(operation, name) {
    switch (operation) {
        case PMOperation.installAll:
            return 'npm install';
        case PMOperation.install:
            return `npm install ${name} --save-exact`;
        case PMOperation.uninstall:
            return `npm uninstall ${name}`;
        case PMOperation.run:
            return `npm run ${name}`;
        case PMOperation.update:
            return `npm update`;
    }
}
function pnpm(operation, name) {
    switch (operation) {
        case PMOperation.installAll:
            return 'pnpm install';
        case PMOperation.install:
            return `pnpm add ${name}  --save-exact`;
        case PMOperation.uninstall:
            return `pnpm remove ${name}`;
        case PMOperation.run:
            return `pnpm ${name}`;
        case PMOperation.update:
            return `pnpm update`;
    }
}
function bun(operation, name) {
    switch (operation) {
        case PMOperation.installAll:
            return 'bun install';
        case PMOperation.install:
            return `bun install ${name}  --save-exact`;
        case PMOperation.uninstall:
            return `bun uninstall ${name}`;
        case PMOperation.run:
            return `bun run ${name}`;
        case PMOperation.update:
            return `bun update`;
    }
}
function npx(project, options) {
    switch (project.packageManager) {
        case PackageManager.bun:
            return `${command_name_1.InternalCommand.cwd}bunx`;
        case PackageManager.pnpm:
            return `${command_name_1.InternalCommand.cwd}pnpm exec`;
        case PackageManager.yarn:
            if ((options === null || options === void 0 ? void 0 : options.forceNpx) && !project.isModernYarn()) {
                return `${command_name_1.InternalCommand.cwd}npx`;
            }
            if ((0, analyzer_1.exists)('@yarnpkg/pnpify')) {
                return `${command_name_1.InternalCommand.cwd}yarn pnpify`;
            }
            return `${command_name_1.InternalCommand.cwd}yarn exec`;
        default:
            return `${command_name_1.InternalCommand.cwd}npx`;
    }
}
exports.npx = npx;
function npmUninstall(name) {
    switch (ionic_tree_provider_1.ionicState.repoType) {
        case monorepo_1.MonoRepoType.npm:
            return `${pm(PMOperation.uninstall, name)} --workspace=${(0, monorepo_1.getMonoRepoFolder)(ionic_tree_provider_1.ionicState.workspace, undefined)}`;
        case monorepo_1.MonoRepoType.folder:
        case monorepo_1.MonoRepoType.yarn:
        case monorepo_1.MonoRepoType.lerna:
        case monorepo_1.MonoRepoType.pnpm:
            return `${command_name_1.InternalCommand.cwd}${pm(PMOperation.uninstall, name)}`;
        default:
            return pm(PMOperation.uninstall, name);
    }
}
exports.npmUninstall = npmUninstall;
function npmRun(name) {
    switch (ionic_tree_provider_1.ionicState.repoType) {
        case monorepo_1.MonoRepoType.npm:
            return `${pm(PMOperation.run, name)} --workspace=${(0, monorepo_1.getMonoRepoFolder)(ionic_tree_provider_1.ionicState.workspace, undefined)}`;
        case monorepo_1.MonoRepoType.folder:
        case monorepo_1.MonoRepoType.yarn:
        case monorepo_1.MonoRepoType.lerna:
        case monorepo_1.MonoRepoType.pnpm:
            return `${command_name_1.InternalCommand.cwd}${pm(PMOperation.run, name)}`;
        default:
            return pm(PMOperation.run, name);
    }
}
exports.npmRun = npmRun;
//# sourceMappingURL=node-commands.js.map