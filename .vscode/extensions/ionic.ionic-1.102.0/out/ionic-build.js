"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ionicBuild = void 0;
const monorepo_1 = require("./monorepo");
const ionic_tree_provider_1 = require("./ionic-tree-provider");
const command_name_1 = require("./command-name");
const node_commands_1 = require("./node-commands");
const analyzer_1 = require("./analyzer");
const build_configuration_1 = require("./build-configuration");
const vscode_1 = require("vscode");
const console_1 = require("console");
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * Creates the ionic build command
 * @param  {Project} project
 * @returns string
 */
async function ionicBuild(project, options) {
    const preop = (0, node_commands_1.preflightNPMCheck)(project);
    ionic_tree_provider_1.ionicState.projectDirty = false;
    const prod = vscode_1.workspace.getConfiguration('ionic').get('buildForProduction');
    let args = options.arguments ? options.arguments : '';
    if (ionic_tree_provider_1.ionicState.project) {
        args += ` --project=${ionic_tree_provider_1.ionicState.project}`;
    }
    const additionalArgs = (0, build_configuration_1.getConfigurationArgs)(false);
    if (additionalArgs) {
        if (additionalArgs.includes('--configuration=') && args.includes('--configuration')) {
            // We've already got the configuration argument so ignore it
        }
        else {
            args += additionalArgs;
        }
    }
    switch (project.repoType) {
        case monorepo_1.MonoRepoType.none:
            return `${preop}${build(prod, project, args, options.platform, options.sourceMaps)}`;
        case monorepo_1.MonoRepoType.npm:
            return `${command_name_1.InternalCommand.cwd}${preop}${build(prod, project, args, options.platform)}`;
        case monorepo_1.MonoRepoType.nx:
            return `${preop}${nxBuild(prod, project, args)}`;
        case monorepo_1.MonoRepoType.folder:
        case monorepo_1.MonoRepoType.yarn:
        case monorepo_1.MonoRepoType.lerna:
        case monorepo_1.MonoRepoType.pnpm:
            return `${command_name_1.InternalCommand.cwd}${preop}${build(prod, project, args, options.platform, options.sourceMaps)}`;
        default:
            throw new Error('Unsupported Monorepo type');
    }
}
exports.ionicBuild = ionicBuild;
function build(prod, project, configurationArg, platform, sourceMaps) {
    let cmd = `${(0, node_commands_1.npx)(project)} ${buildCmd(project)}`;
    if (configurationArg) {
        if (cmd.includes('npm run ionic:build')) {
            // This adds -- if the command is npm run build but does not if it is something like ng build
            cmd += ' -- --';
        }
        else if (cmd.includes('run ')) {
            cmd += ' --';
        }
        cmd += ` ${configurationArg}`;
    }
    else if (prod) {
        cmd += ' --prod';
    }
    if (sourceMaps && cmd.includes('vite')) {
        cmd += ` --sourcemap true`;
    }
    if (platform || (0, analyzer_1.exists)('@capacitor/ios') || (0, analyzer_1.exists)('@capacitor/android')) {
        cmd += ` && ${(0, node_commands_1.npx)(project)} cap copy`;
        if (platform)
            cmd += ` ${platform}`;
    }
    return cmd;
}
function buildCmd(project) {
    var _a, _b;
    switch (project.frameworkType) {
        case 'angular':
        case 'angular-standalone':
            return (_a = guessBuildCommand(project)) !== null && _a !== void 0 ? _a : 'ng build';
        case 'vue-vite':
            return (_b = guessBuildCommand(project)) !== null && _b !== void 0 ? _b : 'vite build';
        case 'react-vite':
            return 'vite build';
        case 'react':
            return 'react-scripts build';
        case 'vue':
            return 'vue-cli-service build';
        default: {
            const cmd = guessBuildCommand(project);
            if (!cmd) {
                (0, console_1.error)('build command is unknown');
            }
            return cmd;
        }
    }
}
function guessBuildCommand(project) {
    const filename = (0, path_1.join)(project.projectFolder(), 'package.json');
    if ((0, fs_1.existsSync)(filename)) {
        const packageFile = JSON.parse((0, fs_1.readFileSync)(filename, 'utf8'));
        if (packageFile.scripts['ionic:build']) {
            return (0, node_commands_1.npmRun)('ionic:build');
        }
        else if (packageFile.scripts['build']) {
            return (0, node_commands_1.npmRun)('build');
        }
    }
    return undefined;
}
function nxBuild(prod, project, configurationArg) {
    let cmd = `${(0, node_commands_1.npx)(project)} nx build ${project.monoRepo.name}`;
    if (configurationArg) {
        cmd += ` ${configurationArg}`;
    }
    else if (prod) {
        cmd += ' --configuration=production';
    }
    return cmd;
}
//# sourceMappingURL=ionic-build.js.map