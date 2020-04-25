/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { memoryConverter } from '../utils';
import { Card } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const extractMemoryInfo = (memoryTypes: number[]) => {
  const relevantMemoryTypes = [];
  for (let i = 0; i < 2; i++) {
    const memory = memoryTypes[i];
    relevantMemoryTypes.push(memory);
  }
  return relevantMemoryTypes;
};

type ProcessMemoryinformationProps = {
  memoryInfo: number[] | null;
  memoryPercent: number;
};

const ProcessMemoryInformation = ({
  memoryInfo,
  memoryPercent,
}: ProcessMemoryinformationProps) => {
  const memoryTypes = ['Physical', 'Virtual'];
  const memory = memoryInfo ? extractMemoryInfo(memoryInfo) : null;

  return (
    <Card>
      <h2>Memory Information</h2>
      <ul>
        <li>
          <strong>Percentage:</strong>{' '}
          {memoryPercent !== null ? (
            `${memoryPercent.toFixed(2)}%`
          ) : (
            <LockOutlined
              css={css`
                font-size: 1.2rem;
              `}
            />
          )}
        </li>
        <li>
          <strong>Memory Types:</strong>{' '}
          {memory ? (
            memory.map(
              (value, i) => `${memoryTypes[i]} ${memoryConverter(value)}GB `,
            )
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

export default ProcessMemoryInformation;
