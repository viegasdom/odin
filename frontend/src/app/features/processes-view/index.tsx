/** @jsx jsx */

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestProcesses, reset } from './processes-view-slice';
import { css, jsx } from '@emotion/core';
import useDebounce from '../../hooks/use-debounce';
import { navigate, RouteComponentProps, Link } from '@reach/router';
import { RootState } from '../../root-reducer';
import { Input, Table } from 'antd';

const { Search } = Input;

const COLUMNS = [
  {
    title: 'PID',
    dataIndex: 'pid',
    key: 'pid',
    render: (pid: number) => {
      return <Link to={`${pid}`}>{pid}</Link>;
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'User',
    dataIndex: 'username',
    key: 'user',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <span
        css={css`
          background: #28a745;
          padding: 10px;
          border-radius: 2px;

          * > {
            background: #28a745;
          }
        `}
      >
        {status}
      </span>
    ),
  },
];

const ProcessesView = (_: RouteComponentProps) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>();

  const selectProcesses = (state: RootState) => state.processesView;
  const { data, loading, error } = useSelector(selectProcesses);

  const [debouncedSearch] = useDebounce(search, 300);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    dispatch(requestProcesses(debouncedSearch));
    if (debouncedSearch?.length) {
      navigate(`?search=${debouncedSearch}`);
    } else if (debouncedSearch?.length === 0) {
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
          margin-bottom: 2rem;
        `}
      >
        <Search
          placeholder="pid, name or username"
          loading={loading}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <Table
        columns={COLUMNS}
        size="large"
        dataSource={
          data ? data.map((process) => ({ ...process, key: process.pid })) : []
        }
      ></Table>
    </div>
  );
};

export default ProcessesView;
