import express from 'express'
import * as accountController from '../controllers/accountController'

const router = express.Router();

router.get('/balance', accountController.balance);

export default router;
