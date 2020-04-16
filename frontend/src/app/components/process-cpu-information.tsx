import React from 'react';
import { setDefault } from '../utils';

type ProcessCPUInformationProps = {
  cpuPercent: number;
  cpuTimes: number[] | null;
};

const ProcessCPUInformation = ({
  cpuPercent,
  cpuTimes,
}: ProcessCPUInformationProps) => {
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
