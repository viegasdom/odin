import React from 'react';
import { Router, Location } from '@reach/router';

import Layout from './components/layout';
import Menu from './components/menu';
import MachineView from './features/machines-view';
import SystemView from './features/system-view';
import ProcessView from './features/process-view';
import ProcessesView from './features/processes-view';
import AppMenu from './components/menu';
import Terminal from './features/terminal-view';

const App = () => {
  return (
    <Layout>
      <Location>{({ location }) => <AppMenu location={location} />}</Location>
      <Router>
        <MachineView path="/machines" />
        <SystemView path="/machines/:machineId/overview" />
        <ProcessesView path="/processes" />
        <ProcessView path="/processes/:pid" />
        <Terminal path="/terminal" />
      </Router>
    </Layout>
  );
};

export default App;
