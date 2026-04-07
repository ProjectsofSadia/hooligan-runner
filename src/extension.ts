import * as vscode from 'vscode';
import * as path from 'path';
import * as cp from 'child_process';

export function activate(context: vscode.ExtensionContext) {

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

function playHooligan(context: vscode.ExtensionContext) {
  const audioPath = path.join(context.extensionPath, 'media', 'hooligan.mp3');
  const cmd = `powershell -c "Add-Type -AssemblyName presentationCore; $mp = New-Object system.windows.media.mediaplayer; $mp.open('${audioPath}'); $mp.Play(); Start-Sleep 10"`;

  cp.exec(cmd, (err) => {
    if (err) {
      vscode.window.showErrorMessage(`Hooligan player error: ${err.message}`);
    }
  });
}

export function deactivate() {}
