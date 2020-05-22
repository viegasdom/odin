import express, { Request, Response } from 'express';
import { queryProcesses, queryProcess, ProcessesData, ProcessData, killProcess } from '../system';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  queryProcesses().then((processes) => res.status(200).send(processes));
});

router.get('/:pid', (req: Request, res: Response) => {
  const pid = parseInt(req.params['pid']);
  queryProcess(pid)
    .then((process) => res.status(200).send(process))
    .catch((error: Error) => res.status(404).send(error.message));
});

router.delete('/:pid', (req: Request, res: Response) => {
  const pid = parseInt(req.params['pid']);
  killProcess(pid)
    .then(() => res.status(204))
    .catch((error: Error) => res.status(404).send(error.message));
});

export default router;
