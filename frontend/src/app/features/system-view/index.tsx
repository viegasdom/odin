/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';

import UserPreview from '../../components/user-preview';
import MemoryInformation from '../../components/memory-information';
import CpuInformation from '../../components/cpu-information';
import { WebSocketError } from '../../components/error';
import Loading from '../../components/loading';
import { RootState } from '../../root-reducer';
import { Fragment, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { connectWebsocket, closeWebsocket } from './system-view-slice';

interface SystemViewProps extends RouteComponentProps<{ machineId: number }> {}

const SystemView = ({ machineId }: SystemViewProps) => {
  const dispatch = useDispatch();

  const selectSystem = (state: RootState) => state.systemPreview;
  const { data, loading, error } = useSelector(selectSystem);

  useEffect(() => {
    dispatch(connectWebsocket('ws://localhost:8000/system'));

    return () => {
      dispatch(closeWebsocket());
    };
  }, []);

  console.log(data);

  // Guard against possible websocket errors and return a error component
  // TODO: Create an error page that should get the error and render that instead
  if (error) return <WebSocketError />;

  // Guard when the data is loading and render a loading component
  // TODO: Create a proper loading component that should be rendered instead
  if (loading || !data) return <Loading />;

  if (!machineId) return <h1>Unknow machine</h1>;

  return (
    <Fragment>
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
            grid-template-columns: 25% 25% auto;
            grid-row-gap: 10px;
            grid-column-gap: 15px;

            > * {
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
              background: white;
              padding: 1rem;
            }
          `}
        >
          <MemoryInformation type="Memory" {...data.memory} />
          <MemoryInformation type="Swap" {...data.swap} />
          <CpuInformation cpu={data.cpu} />
        </div>
      </div>
      <div
        className="container"
        css={css`
          margin-bottom: 0;
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
    </Fragment>
  );
};

export default SystemView;
