/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  requestProcess,
  killProcess,
  resetProcess,
} from './process-view-slice';
import { Button, Result, notification } from 'antd';
import ProcessCPUInformation from '../../components/process-cpu-information';
import ProcessMemoryInformation from '../../components/process-memory-information';
import ProcessEnvironment from '../../components/process-environment';
import { RootState } from '../../root-reducer';
import { RouteComponentProps, navigate } from '@reach/router';
import { LockOutlined, LoadingOutlined } from '@ant-design/icons';

const dateManipulator = (unixTimestamp: number) => {
  const date = new Date(Math.round(unixTimestamp) * 1000);
  return date.toUTCString();
};

interface ProcessViewProps extends RouteComponentProps<{ pid: number }> {}

const ProcessView = ({ pid }: ProcessViewProps) => {
  const dispatch = useDispatch();

  const selectProcess = (state: RootState) => state.processView;
  const { processData, processKilled, loading, error } = useSelector(
    selectProcess,
  );

  // Notifications
  const openNotificationWithIcon = () => {
    notification['success']({
      message: 'Process killed',
      description: `Process ${pid} has been killed with success.`,
    });
  };

  // Effects
  useEffect(() => {
    if (pid) {
      dispatch(requestProcess(pid));
    }
    return () => {
      dispatch(resetProcess());
    };
  }, []);

  const ProcessResult = ({ message }: { message: string }) => (
    <Result
      className="container"
      title={message}
      css={css`
        text-align: center;

        .ant-result-content {
          background: white;
        }
      `}
    >
      <Button
        onClick={() => {
          navigate('/processes');
        }}
        type="primary"
        css={css`
          width: 100%;
        `}
      >
        Check all processes
      </Button>
    </Result>
  );

  if (error) return <ProcessResult message={error.detail} />;

  if (!pid) return <ProcessResult message="No PID provided" />;

  if (processKilled) {
    navigate('/processes');
  }

  if (loading || !processData) {
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
        <h3>
          Name: {processData.name}{' '}
          <span
            css={css`
              margin-left: 10px;
              background: #28a745;
              padding: 10px;
              border-radius: 2px;

              * > {
                background: #28a745;
              }
            `}
          >
            {processData.status}
          </span>
        </h3>
        <Button
          onClick={() => {
            dispatch(killProcess(pid));
            openNotificationWithIcon();
          }}
          disabled={processData.username === 'root'}
          type="primary"
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
          border-radius: 2px;

          & > * {
            margin-bottom: 2rem;
          }
        `}
      >
        <p>
          <strong>PID:</strong> {processData.pid}
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
            }
          `}
        >
          <ProcessCPUInformation
            cpuPercent={processData.cpu_percent}
            cpuTimes={processData.cpu_times}
          />
          <ProcessMemoryInformation
            memoryPercent={processData.memory_percent}
            memoryInfo={processData.memory_info}
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
                  border-radius: 2px;
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
              <p>{dateManipulator(processData.create_time)}</p>
            </li>
            <li>
              <strong>Thread number</strong>{' '}
              <p>
                {processData.num_threads ?? (
                  <LockOutlined
                    css={css`
                      font-size: 1.2rem;
                    `}
                  />
                )}
              </p>
            </li>
            <li>
              <strong>Executable</strong>
              <p>
                {processData.exe ?? (
                  <LockOutlined
                    css={css`
                      font-size: 1.2rem;
                    `}
                  />
                )}
              </p>
            </li>

            <li>
              <ProcessEnvironment environment={processData.environ} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProcessView;
