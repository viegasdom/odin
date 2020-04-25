/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Link } from '@reach/router';
import useShowMore from '../hooks/use-show-more';
import { Button, Card } from 'antd';
import { Processes } from '../features/processes-view/processes-view-slice';
import { Fragment } from 'react';
import { LockOutlined } from '@ant-design/icons';

const BATCH_SIZE = 12;

const ProcessLink = styled(Link)`
  text-decoration: None;
  color: black;

  transition: 0.3s;

  :hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }

  :focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
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
          grid-template-columns: repeat(3, auto);
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
                    <strong>PID:</strong> {process.pid}
                  </p>
                  <p>
                    <strong>Name:</strong> {process.name}
                  </p>
                  <p>
                    <strong>Memory percentage:</strong>{' '}
                    {process.memory_percent ? (
                      `${process.memory_percent.toFixed(2)}%`
                    ) : (
                      <LockOutlined
                        css={css`
                          font-size: 1.2rem;
                        `}
                      />
                    )}
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
