import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestProcess } from './process-view-slice';

const ProcessView = ({ pid }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.processView);

  console.log(data);

  useEffect(() => {
    dispatch(requestProcess(pid));
  }, []);

  return <h1>Process</h1>;
};

export default ProcessView;
