import React from 'react';

export const WebSocketError = () => {
  return <h1>Error loading the websocket</h1>;
};

type ErrorProps = {
  error: string;
};

export const Process404Error = ({ error }: ErrorProps) => {
  return <h1>{error}</h1>;
};
