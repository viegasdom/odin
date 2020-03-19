import React from 'react';
import { css } from '@emotion/core';
import { setDefault } from '../utils';

const ProcessCPUInformation = ({ cpuPercent, cpuTimes }) => {
  return (
    <div>
      <h2>CPU Information</h2>
      <ul>
        <li>
          <strong>CPU Usage:</strong> {setDefault(cpuPercent, 0)}%
        </li>
        <li>
          <strong>CPU User Time:</strong>{' '}
          {cpuTimes ? Math.round(setDefault(cpuTimes[0], 0)) : 0}s
        </li>
      </ul>
    </div>
  );
};

export default ProcessCPUInformation;
