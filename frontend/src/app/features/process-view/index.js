import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/loading';
import WebSocketError from '../../components/error';
import { requestProcess } from './process-view-slice';
import { css } from '@emotion/core';
import ProcessCPUInformation from '../../components/process-cpu-information';
import ProcessMemoryInformation from '../../components/process-memory-information';
import ProcessEnvironment from '../../components/process-environment';

const dateManipulator = unixTimestamp => {
  console.log(unixTimestamp);
  const date = new Date(Math.round(unixTimestamp) * 1000);
  return date.toUTCString();
};

const ProcessView = ({ pid }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.processView);

  useEffect(() => {
    dispatch(requestProcess(pid));
  }, []);

  // Guard against possible websocket errors and return a error component
  // TODO: Create an error page that should get the error and render that instead
  if (error) return <WebSocketError />;

  console.log(data);

  // Guard when the data is loading and render a loading component
  // TODO: Create a proper loading component that should be rendered instead
  if (loading || !data) return <Loading />;

  return (
    <div
      className="container"
      css={css`
        margin-top: 2rem;
      `}
    >
      <h2>
        Process name: {data.name}{' '}
        <span
          css={css`
            margin-left: 10px;
            background: #28a745;
            padding: 10px;
            border-radius: 10px;

            * > {
              background: #28a745;
            }
          `}
        >
          {data.status}
        </span>
      </h2>
      <div
        css={css`
          margin: 0 0;
          margin-top: 3rem;
          background: #fafafa;
          padding: 2rem;
          border-radius: 10px;

          & > * {
            margin-bottom: 2rem;
          }
        `}
      >
        <p>
          <strong>Process ID:</strong> {data.pid}
        </p>
        <div
          css={css`
            display: grid;
            padding-bottom: 2rem;
            width: 100%;
            grid-template-columns: repeat(2, auto);
            grid-gap: 1px 5rem;

            > * {
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
              background: white;
              padding: 1rem;
              border-radius: 8px;
            }
          `}
        >
          <ProcessCPUInformation
            cpuPercent={data.cpu_percent}
            cpuTimes={data.cpu_times}
          />
          <ProcessMemoryInformation
            memoryPercent={data.memory_percent}
            memoryInfo={data.memory_info}
          />
        </div>
        <div>
          <h2>Details</h2>
          <ul
            css={css`
              & > * {
                margin-bottom: 0.5rem;
              }
            `}
          >
            <li>
              <strong>Created at: </strong> {dateManipulator(data.create_time)}
            </li>
            <li>
              <strong>Thread number: </strong> {data.num_threads}
            </li>
            <li>
              <strong>Executable: </strong> {data.exe}
            </li>
            <li>
              <ProcessEnvironment environment={data.environ} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProcessView;
