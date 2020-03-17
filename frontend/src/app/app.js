import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import SystemView from './features/system-view';
import Layout from './components/layout';
import Menu from './components/menu';
import { useDispatch } from 'react-redux';
import { connectWebsocket } from './features/system-view/system-view-slice';
import ProcessView from './features/process-view';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectWebsocket('ws://localhost:8000/system'));
  }, []);

  return (
    <Layout>
      <Menu labels={['Overview']} />
      <Router>
        <SystemView path="/" />
        <ProcessView path="/processes/:pid" />
      </Router>
    </Layout>
  );
};

export default App;
