import { useState, useEffect } from 'react';
import { Terminal } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';

const useTerminal = () => {
  useEffect(() => {
    const term = new Terminal();
    const socket = new WebSocket('ws://localhost:8000/terminal');
    // const attachAddon = new AttachAddon(socket);
    // term.loadAddon(attachAddon);

    term.open(document.getElementById('terminal') as HTMLElement);
    term.onData((data) => {
      socket.send(data);
    });

    socket.onmessage = (msg) => {
      console.log(msg.data);
      term.write(msg.data);
    };

    // term.write('Terminal (' + term.cols + 'x' + term.rows + ')\n\r');
    //        term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')

    //        window.addEventListener('resize', resizeScreen, false)
    return () => {
      socket.close();
    };
  });
};

export default useTerminal;
