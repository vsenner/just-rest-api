import express from 'express';
import usersRouter from './users/index.js';
import categoriesRouter from './categories/index.js';
import expensesRouter from './expense/index.js';
import incomeRouter from './income/index.js';
import walletRouter from './wallet/index.js';

const router = express.Router();

router.use('/user', usersRouter);
router.use('/category', categoriesRouter);
router.use('/expense', expensesRouter);
router.use('/income', incomeRouter)
router.use('/wallet', walletRouter);
export default router;