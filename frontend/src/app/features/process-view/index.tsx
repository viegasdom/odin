/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import Loading from '../../components/loading';
import { Process404Error } from '../../components/error';
import { requestProcess, killProcess } from './process-view-slice';
import ProcessCPUInformation from '../../components/process-cpu-information';
import ProcessMemoryInformation from '../../components/process-memory-information';
import ProcessEnvironment from '../../components/process-environment';
import { Button } from '../../components/buttons';
import { RootState } from '../../root-reducer';

const dateManipulator = (unixTimestamp: number) => {
  const date = new Date(Math.round(unixTimestamp) * 1000);
  return date.toUTCString();
};

type ProcessViewProps = {
  pid: number;
};

const ProcessView = ({ pid }: ProcessViewProps) => {
  const dispatch = useDispatch();
  const [processKilled, setProcessKilled] = useState(false);

  const selectProcess = (state: RootState) => state.processView;
  const { data, loading, error } = useSelector(selectProcess);

  useEffect(() => {
    dispatch(requestProcess(pid));
  }, []);

  // Guard against possible websocket errors and return a error component
  // TODO: Create an error page that should get the error and render that instead
  if (error) return <Process404Error error={error.detail} />;

  // Guard when the data is loading and render a loading component
  // TODO: Create a proper loading component that should be rendered instead
  if (loading || !data) return <Loading />;

  if (processKilled && data.detail) return <h1>{data.detail}</h1>;

  return (
    <div
      className="container"
      css={css`
        margin-top: 2rem;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          align-content: center;
          text-align: center;
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
        <Button
          onClick={() => {
            dispatch(killProcess(pid));
            setProcessKilled(true);
          }}
        >
          Kill Process
        </Button>
      </div>
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
              & > li {
                margin-bottom: 1.5rem;
                overflow-wrap: anywhere;

                p {
                  background: white;
                  border-radius: 10px;
                  padding: 10px;
                  margin-top: 0.5rem;
                  width: fit-content;
                  font-family: Fira code;
                  font-size: 0.7rem;
                }
              }
            `}
          >
            <li>
              <strong>Created at</strong>
              <p>{dateManipulator(data.create_time)}</p>
            </li>
            {data.num_threads ? (
              <li>
                <strong>Thread number</strong> <p>{data.num_threads}</p>
              </li>
            ) : null}
            {data.exe ? (
              <li>
                <strong>Executable</strong>
                <p>{data.exe}</p>
              </li>
            ) : null}
            {!isEmpty(data.environ) ? (
              <li>
                <ProcessEnvironment environment={data.environ} />
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProcessView;
