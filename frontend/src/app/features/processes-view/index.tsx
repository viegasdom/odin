/** @jsx jsx */

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestProcesses, Processes } from './processes-view-slice';
import ProcessItem from '../../components/process-item';
import { css, jsx } from '@emotion/core';
import useInfiniteScroll from '../../hooks/use-infinite-scroll';
import useDebounce from '../../hooks/use-debounce';
import { navigate } from '@reach/router';
import { RootState } from '../../root-reducer';

const ProcessesView = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const selectProcesses = (state: RootState) => state.processesView;
  const { data, loading, error } = useSelector(selectProcesses);

  const [currentItems] = useInfiniteScroll<Processes>(data || undefined, 20);
  const [debouncedSearch] = useDebounce(search, 300);

  useEffect(() => {
    dispatch(requestProcesses(debouncedSearch));
    if (debouncedSearch.length) {
      navigate(`?search=${debouncedSearch}`);
    } else {
      navigate('/processes');
    }
  }, [debouncedSearch]);

  if (error) return <h1>Error</h1>;

  return (
    <div className="container">
      <div
        className="container"
        css={css`
          margin-top: 2rem;
        `}
      >
        <input
          type="text"
          defaultValue={search.length ? search : ''}
          placeholder="pid, name or username"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          css={css`
            border-radius: 8px;
            border: 1px solid #d0d0d0;
            padding: 10px;
            background: #fafafa;
            font-size: 14px;

            ::placeholder {
              font-style: italic;
            }
          `}
        />
      </div>
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
            currentItems.map((process) => (
              <ProcessItem key={process.pid} {...process} />
            ))
          ) : (
            <h1>Loading</h1>
          )}
        </tbody>
      </table>
      <div></div>
    </div>
  );
};

export default ProcessesView;
