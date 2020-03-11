import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestProcess } from './process-view-slice';

const ProcessView = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.processView);

  console.log(data);

  useEffect(() => {
    requestProcess;
    dispatch(requestProcess(1));
  }, []);

  return <h1>Process</h1>;
};

export default ProcessView;
