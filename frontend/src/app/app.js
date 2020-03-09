import React from 'react';
import { css } from '@emotion/core';
import SystemPreview from './features/system-preview';
import Layout from './components/layout';
import Menu from './components/menu';

const App = () => {
  return (
    <Layout>
      <Menu labels={['Overview']} />
      <SystemPreview />
    </Layout>
  );
};

export default App;
