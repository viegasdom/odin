import React from 'react';
import { css } from '@emotion/core';
import useWebsocket from '../../hooks/use-websocket';
import UserPreview from '../../components/user-preview';
import MemoryInformation from '../../components/memory-information';
import CpuInformation from '../../components/cpu-information';

const WebSocketError = () => {
  return <h1>Error loading the websocket</h1>;
};

const Loading = () => {
  return <h1>Loading</h1>;
};

const SystemPreview = () => {
  const [data, loading, error] = useWebsocket();

  // Guard against possible websocket errors and return a error component
  // TODO: Create an error page that should get the error and render that instead
  if (error) return <WebSocketError />;

  // Guard when the data is loading and render a loading component
  // TODO: Create a proper loading component that should be rendered instead
  if (loading || !data.processes) return <Loading />;

  return (
    <div
      css={css`
        margin: auto;
        max-width: 90vw;
        width: 1000px;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          width: 900px;
          margin-bottom: 2rem;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            width: 500px;
          `}
        >
          <MemoryInformation type="Memory" {...data.memory} />
          <MemoryInformation type="Swap" {...data.swap} />
        </div>
        <div>
          <CpuInformation cpu={data.cpu} />
        </div>
      </div>
      {Object.entries(data.processes).map(([username, processes]) => {
        return <UserPreview key={username} username={username} processes={processes} />;
      })}
    </div>
  );
};

export default SystemPreview;
