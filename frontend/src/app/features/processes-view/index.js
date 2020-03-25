import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestProcesses } from './processes-view-slice';
import ProcessItem from '../../components/process-item';
import { css } from '@emotion/core';
import useInfiniteScroll from '../../hooks/use-infinite-scroll';

const ProcessesView = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.processesView);
  const [currentItems] = useInfiniteScroll(data, 20);

  useEffect(() => {
    dispatch(requestProcesses());
  }, []);

  if (error) return <h1>Error</h1>;

  if (loading || !data) return <h1>Loading</h1>;

  return (
    <table
      className="container"
      css={css`
        background: #fafafa;
        padding: 2rem;
        margin-top: 2rem;
        border-radius: 8px;
        border-collapse: collapse;
      `}
    >
      <tbody>
        <tr className="row">
          <th>PID</th>
          <th>Name</th>
          <th>User</th>
          <th>Status</th>
        </tr>
        {currentItems.map(process => (
          <ProcessItem key={process.pid} {...process} />
        ))}
      </tbody>
    </table>
  );
};

export default ProcessesView;
