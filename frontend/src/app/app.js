import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import SystemPreview from './features/system-preview';
import Layout from './components/layout';
import Menu from './components/menu';
import { useDispatch } from 'react-redux';
import { connectWebsocket } from './features/system-preview/system-preview-slice';
import ProcessView from './features/process-view';

const Home = () => <SystemPreview />;
const Process = () => <ProcessView />;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectWebsocket('ws://localhost:8000/system'));
  }, []);

  return (
    <Layout>
      <Menu labels={['Overview']} />
      <Router>
        <Home path="/" />
        <Process path="/processes/:pid" />
      </Router>
    </Layout>
  );
};

export default App;
