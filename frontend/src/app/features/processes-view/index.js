import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestProcesses } from './processes-view-slice';
import ProcessItem from '../../components/process-item';
import { css } from '@emotion/core';
import usePaginate from '../../hooks/use-paginate';

const ProcessesView = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.processesView);
  const [page, pageNum, setPage] = usePaginate(data, 20);
  console.log(data);

  useEffect(() => {
    dispatch(requestProcesses());
  }, []);

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
      <tr>
        <th>PID</th>
        <th>Name</th>
        <th>User</th>
        <th>Status</th>
      </tr>
      {page.map(process => (
        <ProcessItem key={process.pid} {...process} />
      ))}
    </table>
  );
};

export default ProcessesView;
