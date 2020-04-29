import express from 'express'
import * as bankController from '../controllers/bankController'

const router = express.Router();

router.get('/test', bankController.test);

export default router;
