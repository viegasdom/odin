import React from 'react';
import useTerminal from '../../hooks/use-terminal';
import { RouteComponentProps } from '@reach/router';
import 'xterm/css/xterm.css';

const Terminal = (_: RouteComponentProps) => {
  const lol = useTerminal();

  return (
    <div>
      <div id="terminal" />
    </div>
  );
};

export default Terminal;
