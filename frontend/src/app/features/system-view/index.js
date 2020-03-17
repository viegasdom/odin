import React from 'react';
import { css } from '@emotion/core';
import { useSelector } from 'react-redux';

import UserPreview from '../../components/user-preview';
import MemoryInformation from '../../components/memory-information';
import CpuInformation from '../../components/cpu-information';
import WebSocketError from '../../components/error';
import Loading from '../../components/loading';

const SystemView = () => {
  const { data, loading, error } = useSelector(state => state.systemPreview);

  // Guard against possible websocket errors and return a error component
  // TODO: Create an error page that should get the error and render that instead
  if (error) return <WebSocketError />;

  // Guard when the data is loading and render a loading component
  // TODO: Create a proper loading component that should be rendered instead
  if (loading || !data.processes) return <Loading />;

  return (
    <>
      <div
        css={css`
          padding: 2rem;
          border-bottom: 1px solid #d0d0d0;
          margin-bottom: 2rem;
          background: #fafafa;
        `}
      >
        <div
          className="container"
          css={css`
            display: grid;
            grid-template-columns: 20% 20% auto;
            grid-row-gap: 10px;
            grid-column-gap: 15px;

            > * {
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
              background: white;
              padding: 1rem;
              border-radius: 8px;
            }
          `}
        >
          <MemoryInformation type="Memory" {...data.memory} />
          <MemoryInformation type="Swap" {...data.swap} />
          <CpuInformation cpu={data.cpu} />
        </div>
      </div>
      <div
        css={css`
          margin: auto;
          max-width: 90vw;
          width: 1000px;
        `}
      >
        {Object.entries(data.processes).map(([username, processes]) => {
          return (
            <UserPreview
              key={username}
              username={username}
              processes={processes}
            />
          );
        })}
      </div>
    </>
  );
};

export default SystemView;
