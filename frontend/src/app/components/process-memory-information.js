import React from 'react';
import { css } from '@emotion/core';
import { setDefault, memoryConverter } from '../utils';

const extractMemoryInfo = memoryTypes => {
  if (!memoryTypes) {
    // If there's no memory types just return a fixed array
    // where the memory usage is 0 in both physical and virtual
    return [0.0, 0.0];
  }

  const relevantMemoryTypes = [];
  for (let i = 0; i < 2; i++) {
    const memory = memoryTypes[i];
    relevantMemoryTypes.push(memory);
  }
  return relevantMemoryTypes;
};

const ProcessMemoryInformation = ({ memoryInfo, memoryPercent }) => {
  const memoryTypes = ['Physical', 'Virtual'];
  const memory = extractMemoryInfo(memoryInfo);

  return (
    <div>
      <h2>Memory Information</h2>
      <ul>
        <li>
          <strong>Memory Usage:</strong>{' '}
          {setDefault(memoryPercent, 0).toFixed(2)}%
        </li>
        <li
          css={css`
            display: flex;
          `}
        >
          <strong>Memory Types:</strong>
          <div
            css={css`
              display: flex;
              margin-left: 5px;
            `}
          >
            {memory.map(
              (value, i) => `${memoryTypes[i]}: ${memoryConverter(value)} GB `,
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ProcessMemoryInformation;
