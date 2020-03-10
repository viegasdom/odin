import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Link } from '@reach/router';
import useShowMore from '../hooks/use-show-more';

const BATCH_SIZE = 9;

const ProcessLink = styled(Link)`
  text-decoration: None;
  color: black;

  border-radius: 8px;
  padding: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  transition: 0.3s;

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.12);
    transform: translate3D(0, -1px, 0) scale(1.03);
  }

  :focus {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.12);
    transform: translate3D(0, -1px, 0) scale(1.05);
    outline: none;
  }
`;

const Button = styled.button`
  background: black;
  color: white;
  font-size: 1rem;
  padding: 12px;
  border: 1px solid black;
  border-radius: 8px;
  transition: 0.3s;

  :first-of-type {
    margin-right: 10px;
  }

  :hover {
    transition: 0.3s;
    background: white;
    color: black;
  }

  :focus {
    transition: 0.3s;
    background: white;
    color: black;
    outline: none;
  }

  :disabled {
    background: #d0d0d0;
    color: black;
  }

  :disabled:hover {
    cursor: not-allowed;
  }
`;

// TODO: Install reach router and make the Process ID a Link to Process details
const ProcessesPreview = ({ processes }) => {
  const [notShowMore, currentProcesses, showMore, setShowMore] = useShowMore(
    processes,
    {
      batchSize: BATCH_SIZE,
      uniqueID: 'pid',
    },
  );

  console.log(showMore);

  return (
    <>
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(3, 33%);
          grid-template-rows: repeat(3, auto);
          grid-row-gap: 10px;
          grid-column-gap: 15px;
          margin-bottom: 1rem;
        `}
      >
        {currentProcesses.map(process => {
          return (
            <ProcessLink key={process.pid} to={`processes/${process.pid}`}>
              <li>
                <p>
                  <strong>Process ID:</strong> {process.pid}
                </p>
                <p>
                  <strong>Process Name:</strong> {process.name}
                </p>
                <p>
                  <strong>Process Processor Usage:</strong>{' '}
                  {process.cpu_percent ? process.cpu_percent.toFixed(2) : 0}
                </p>
                <p>
                  <strong>Process Memory Usage:</strong>{' '}
                  {process.memory_percent
                    ? process.memory_percent.toFixed(2)
                    : 0}
                </p>
              </li>
            </ProcessLink>
          );
        })}
      </div>
      <div
        css={css`
          justify-content: center;
          align-content: center;
          text-align: center;
        `}
      >
        <Button
          onClick={() => setShowMore(showMore + 1)}
          disabled={notShowMore}
        >
          Show More &darr;
        </Button>
        <Button onClick={() => setShowMore(showMore - 1)} disabled={!showMore}>
          Show Less &uarr;
        </Button>
      </div>
    </>
  );
};

export default ProcessesPreview;
