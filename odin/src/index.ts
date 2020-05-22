import cors from 'cors';
import express from 'express';
import http from 'http';
import ws from 'ws';

import routes from './routes';
import { terminalSocketHandler } from './routes/terminal';
import { systemSocketHandler } from './routes/system';

(() => {
  const app = express();
  const port = process.env.PORT || 8000;

  app.use(cors());
  app.use(routes);

  const server = http.createServer(app);
  const wss = new ws.Server({ server });
  wss.on('connection', (socket: WebSocket, req: Request) => {
    if (req.url.includes('terminal')) {
      terminalSocketHandler(socket);
    } else if (req.url.includes('system')) {
      systemSocketHandler(socket);
    }
  });

  server.listen(port, () => {
    console.log(`serving on http://localhost:${port}`);
  });
})();
