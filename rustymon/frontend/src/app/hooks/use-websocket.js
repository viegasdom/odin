import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { connectWebsocket } from './../features/system-preview/system-preview-slice';

const useWebsocket = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.systemPreview);

  useEffect(() => {
    dispatch(connectWebsocket('ws://localhost:8000/system'));
  }, []);

  return [data, loading, error];
};

export default useWebsocket;
