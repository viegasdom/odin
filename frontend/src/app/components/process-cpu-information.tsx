/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { Card } from 'antd';
import { LockOutlined } from '@ant-design/icons';

type ProcessCPUInformationProps = {
  cpuPercent: number;
  cpuTimes: number[] | null;
};

const ProcessCPUInformation = ({
  cpuPercent,
  cpuTimes,
}: ProcessCPUInformationProps) => {
  return (
    <Card>
      <h2>CPU Information</h2>
      <ul>
        <li>
          <strong>CPU Usage:</strong>{' '}
          {cpuPercent !== -1 ? (
            `${cpuPercent}%`
          ) : (
            <LockOutlined
              css={css`
                font-size: 1.2rem;
              `}
            />
          )}
        </li>
        <li>
          <strong>CPU User Time:</strong>{' '}
          {cpuTimes ? (
            `${Math.round(cpuTimes[0])}s`
          ) : (
            <LockOutlined
              css={css`
                font-size: 1.2rem;
              `}
            />
          )}
        </li>
      </ul>
    </Card>
  );
};

export default ProcessCPUInformation;
