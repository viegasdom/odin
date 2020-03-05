import React from 'react';
import useWebsocket from '../../hooks/use-websocket';

const WebSocketError = () => {
  return <h1>Error loading the websocket</h1>;
};

const Loading = () => {
  return <h1>Loading</h1>;
};

const SystemPreview = () => {
  const [data, loading, error] = useWebsocket();

  if (error) return <WebSocketError />;
  if (loading) return <Loading />;

  console.log(data);
  return (
    <div>
      {data?.processes?.root.map(p => (
        <li key={p.pid}>
          {p.name} {p.cpu_percent} {p.memory_percent}
        </li>
      ))}
    </div>
  );
};

export default SystemPreview;
