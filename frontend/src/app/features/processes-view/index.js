import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestProcesses } from './processes-view-slice';
import ProcessItem from '../../components/process-item';
import { css } from '@emotion/core';
import useInfiniteScroll from '../../hooks/use-infinite-scroll';
import useDebounce from '../../hooks/use-debounce';

const ProcessesView = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const { data, loading, error } = useSelector(state => state.processesView);

  const [currentItems] = useInfiniteScroll(data, 20);
  const [debouncedSearch] = useDebounce(search, 300);

  useEffect(() => {
    dispatch(requestProcesses(debouncedSearch));
  }, [debouncedSearch]);

  if (error) return <h1>Error</h1>;

  return (
    <div className="container">
      <input
        type="text"
        defaultValue={search.length ? search : ''}
        placeholder="pid, name or username"
        onChange={e => {
          setSearch(e.target.value);
        }}
        css={css`
          margin-top: 2rem;
          border-radius: 8px;
          border: 1px solid #d0d0d0;
          padding: 10px;
          background: #fafafa;
          font-size: 14px;
          font-style: italic;
        `}
      />

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
          {!loading ? (
            currentItems.map(process => (
              <ProcessItem key={process.pid} {...process} />
            ))
          ) : (
            <h1>Loading</h1>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProcessesView;
