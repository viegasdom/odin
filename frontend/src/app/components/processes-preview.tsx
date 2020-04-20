/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Link } from '@reach/router';
import useShowMore from '../hooks/use-show-more';
import { setDefault } from '../utils';
import { Button, Card } from 'antd';
import { Processes } from '../features/processes-view/processes-view-slice';
import { Fragment } from 'react';

const BATCH_SIZE = 6;

const ProcessLink = styled(Link)`
  text-decoration: None;
  color: black;

  transition: 0.3s;

  :hover {
    transform: translate3D(0, -1px, 0) scale(1.03);
  }

  :focus {
    outline-offset: 3px;
  }
`;

type ProcessesPreviewProps = {
  processes: Processes[];
};

const ProcessesPreview = ({ processes }: ProcessesPreviewProps) => {
  const [notShowMore, currentProcesses, showMore, setShowMore] = useShowMore<
    Processes
  >(processes, {
    batchSize: BATCH_SIZE,
    uniqueID: 'pid',
  });

  return (
    <Fragment>
      <ul
        css={css`
          display: grid;
          grid-template-columns: repeat(2, auto);
          grid-row-gap: 10px;
          grid-column-gap: 15px;
          margin-bottom: 1rem;
          list-style-type: none;
        `}
      >
        {currentProcesses.map((process, id) => {
          return (
            <ProcessLink
              key={`position-${id}-${process.pid}`}
              to={`/processes/${process.pid}`}
            >
              <li>
                <Card>
                  <p>
                    <strong>Process ID:</strong> {process.pid}
                  </p>
                  <p>
                    <strong>Process Name:</strong> {process.name}
                  </p>
                  <p>
                    <strong>Process Processor Usage:</strong>{' '}
                    {setDefault(process.cpu_percent, 0).toFixed(2)}%
                  </p>
                  <p>
                    <strong>Process Memory Usage:</strong>{' '}
                    {setDefault(process.memory_percent, 0).toFixed(2)}%
                  </p>
                </Card>
              </li>
            </ProcessLink>
          );
        })}
      </ul>
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
    </Fragment>
  );
};

export default ProcessesPreview;
