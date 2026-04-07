"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const path = require("path");
const cp = require("child_process");
function activate(context) {
    const command = vscode.commands.registerCommand('hooligan-run.play', () => {
        playHooligan(context);
    });
    const taskListener = vscode.tasks.onDidEndTaskProcess(e => {
        if (e.exitCode === 0) {
            playHooligan(context);
        }
    });
    context.subscriptions.push(command, taskListener);
}
function playHooligan(context) {
    const audioPath = path.join(context.extensionPath, 'media', 'hooligan.mp3');
    const cmd = `powershell -c "Add-Type -AssemblyName presentationCore; $mp = New-Object system.windows.media.mediaplayer; $mp.open('${audioPath}'); $mp.Play(); Start-Sleep 10"`;
    cp.exec(cmd, (err) => {
        if (err) {
            vscode.window.showErrorMessage(`Hooligan player error: ${err.message}`);
        }
    });
}
function deactivate() { }
//# sourceMappingURL=extension.js.map