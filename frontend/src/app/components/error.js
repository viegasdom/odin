import React from 'react';

export const WebSocketError = () => {
  return <h1>Error loading the websocket</h1>;
};

export const Process404Error = ({ error }) => {
  return <h1>{error}</h1>;
};
