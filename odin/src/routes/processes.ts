import express, { Request, Response } from 'express';
import { queryProcesses, queryProcess, killProcess } from '../system';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  queryProcesses().then((processes) => {
    const search = req.query.search;

    if (!search) {
      res.status(200).send(processes);
      return;
    }

    // Asserts that the search comes in only as a string
    if (typeof search !== 'string') {
      res.status(200).send([]);
      return;
    }

    const searchedProcesses = processes.filter(
      (p) =>
        p.name.toLowerCase().includes(search.trim().toLowerCase()) ||
        p.status.toLowerCase().includes(search.trim().toLowerCase()) ||
        p.username.toLowerCase().includes(search.trim().toLowerCase()) ||
        p.pid.toString().includes(search.trim()),
    );

    res.status(200).send(searchedProcesses);
  });
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
