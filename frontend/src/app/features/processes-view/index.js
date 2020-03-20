import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestProcesses } from './processes-view-slice';

const ProcessesView = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.processesView);
  console.log(data);
  useEffect(() => {
    dispatch(requestProcesses());
  }, []);

  return <div>Processes</div>;
};

export default ProcessesView;
