import express from 'express';
import controller from './user.controller';
import { authRequired } from '../../auth/auth.service';

let router = express.Router();

router.get('/me', authRequired(), controller.me);

module.exports = router;
