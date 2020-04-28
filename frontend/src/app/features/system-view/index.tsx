/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';

import UserPreview from '../../components/user-preview';
import MemoryInformation from '../../components/memory-information';
import CpuInformation from '../../components/cpu-information';
import { RootState } from '../../root-reducer';
import { Fragment, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { connectWebsocket, closeWebsocket } from './system-view-slice';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import { Result } from 'antd';
import {
  requestMachines,
  resetMachineState,
} from '../machines-view/machines-view-slice';

interface SystemViewProps extends RouteComponentProps<{ machineId: string }> {}

const SystemView = ({ machineId }: SystemViewProps) => {
  const dispatch = useDispatch();

  const selectSystem = (state: RootState) => state.systemPreview;
  const { data, loading, error } = useSelector(selectSystem);

  const selectMachines = (state: RootState) => state.machineView;
  const {
    data: machineData,
    loading: machineLoading,
    error: machineError,
  } = useSelector(selectMachines);

  useEffect(() => {
    if (!machineData.length) {
      dispatch(requestMachines());
    }

    return () => {
      dispatch(closeWebsocket());
      dispatch(resetMachineState());
    };
  }, []);

  useEffect(() => {
    if (!machineId) {
      return;
    }

    const machineIdNumber = parseInt(machineId);
    const machine = machineData.find((m) => m.id === machineIdNumber);
    if (machine) {
      dispatch(connectWebsocket(`ws://${machine?.host}/system`));
    }
  }, [machineData]);

  // Guard against possible websocket errors and return a error component
  // TODO: Create an error page that should get the error and render that instead
  if (error || machineError) {
    return (
      <Result
        status="error"
        title="Error creating socket connection"
        subTitle={error}
        icon={<CloseOutlined />}
      />
    );
  }

  // Guard when the data is loading and render a loading component
  // TODO: Create a proper loading component that should be rendered instead
  if (loading || machineLoading || !data || !machineData) {
    return (
      <div
        className="container"
        css={css`
          align-items: center;
          align-content: center;
          text-align: center;
          margin-top: 4rem;
        `}
      >
        <LoadingOutlined
          css={css`
            font-size: 5rem;
          `}
        />
      </div>
    );
  }

  if (!machineId) return <h1>Unknow machine</h1>;

  return (
    <Fragment>
      <div
        css={css`
          padding: 2rem;
          border-bottom: 1px solid #f0f0f0;
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
          <MemoryInformation type="Memory" {...data.memory} loading={loading} />
          <MemoryInformation type="Swap" {...data.swap} loading={loading} />
          <CpuInformation cpu={data.cpu} loading={loading} />
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
