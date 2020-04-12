import { css } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/loading';
import { requestMachines, createMachine } from './machines-view-slice';

const MachineView = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.machineView);

  useEffect(() => {
    dispatch(requestMachines());
  }, []);

  // Guard against possible websocket errors and return a error component
  // TODO: Create an error page that should get the error and render that instead
  if (error) return <Process404Error error={error.detail} />;

  // Guard when the data is loading and render a loading component
  // TODO: Create a proper loading component that should be rendered instead
  if (loading) return <Loading />;

  console.log(data);
  return (
    <div
      className="container"
      css={css`
        margin-top: 2rem;
      `}
    ></div>
  );
};

export default MachineView;
