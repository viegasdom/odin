import React, { useEffect } from 'react';
import { Router, Location } from '@reach/router';
import SystemView from './features/system-view';
import Layout from './components/layout';
import Menu from './components/menu';
import { useDispatch } from 'react-redux';
import { connectWebsocket } from './features/system-view/system-view-slice';
import ProcessView from './features/process-view';
import ProcessesView from './features/processes-view';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectWebsocket('ws://localhost:8000/system'));
  }, []);

  return (
    <Layout>
      <Location>
        {({ location }) => (
          <Menu labels={['Overview', 'Processes']} location={location} />
        )}
      </Location>
      <Router>
        <SystemView path="/overview" />
        <ProcessesView path="/processes" />
        <ProcessView path="/processes/:pid" />
      </Router>
    </Layout>
  );
};

export default App;
