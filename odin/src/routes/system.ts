import { systemStats } from '../system';

export function systemSocketHandler(ws: WebSocket) {
  const interval = setInterval(
    () =>
      systemStats().then((stats) => {
        ws.send(JSON.stringify(stats));
      }),
    1000,
  );

  ws.onclose = () => {
    clearInterval(interval);
  };
}
