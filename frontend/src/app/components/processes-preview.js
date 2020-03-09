import React from 'react';
import { css } from '@emotion/core';
import { Link } from '@reach/router';
import useShowMore from '../hooks/use-show-more';

// TODO: Install reach router and make the Process ID a Link to Process details
const ProcessesPreview = ({ processes }) => {
  const [currentProcesses, showMore, setShowMore] = useShowMore(processes, { batchSize: 9, uniqueID: 'pid' });

  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(3, 33%);
        grid-template-rows: repeat(3, auto);
        grid-row-gap: 1px;
        grid-column-gap: 9px;
        margin-bottom: 3rem;
      `}
    >
      {currentProcesses.map(process => {
        return (
          <li
            css={css`
              border: 1px solid #d0d0d0;
              border-radius: 10px;
              padding: 5px;
            `}
            key={process.pid}
          >
            <p>
              <strong>Process ID:</strong> <Link to={`${process.pid}`}>{process.pid}</Link>
            </p>
            <p>
              <strong>Process Name:</strong> {process.name}
            </p>
            <p>
              <strong>Process Processor Usage:</strong> {process.cpu_percent ? process.cpu_percent.toFixed(2) : 0}
            </p>
            <p>
              <strong>Process Memory Usage:</strong> {process.memory_percent ? process.memory_percent.toFixed(2) : 0}
            </p>
          </li>
        );
      })}
      <button onClick={() => setShowMore(showMore + 1)}>Show More</button>
    </div>
  );
};

export default ProcessesPreview;
