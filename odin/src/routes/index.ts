import express from 'express';
import ProcessesRouter from './processes';

const router = express.Router();

router.use('/processes', ProcessesRouter);

export default router;
