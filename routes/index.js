import express from 'express';
import usersRouter from './users/index.js';
import categoriesRouter from './categories/index.js';
import expensesRouter from './expense/index.js';
import incomeRouter from './income/index.js';
import walletRouter from './wallet/index.js';
import {authMiddleware} from "../middleware/index.js";

const router = express.Router();

router.use('/user', usersRouter);
router.use('/category', authMiddleware, categoriesRouter);
router.use('/expense', authMiddleware, expensesRouter);
router.use('/income', authMiddleware, incomeRouter)
router.use('/wallet', authMiddleware, walletRouter);

export default router;