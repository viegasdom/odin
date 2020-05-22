import os from 'os';
import { spawn } from 'node-pty';

const SHELLS: { [key: string]: string } = {
  win32: 'powershell.exe',
  darwin: 'zsh',
  linux: 'bash',
};

export function terminalSocketHandler(ws: WebSocket) {
  const ptyProc = spawn(SHELLS[os.platform()], [], {
    name: 'xterm-color',
    cwd: process.env.HOME,
  });

  ptyProc.on('data', (data) => {
    // Whenever pty outputs something that data will be sent to
    // the terminal in the client.
    ws.send(data);
  });

  ws.onmessage = ({ data }) => {
    // Whenever a message (client writes something) is received
    // send the input to the pty process.
    ptyProc.write(data);
  };
}
