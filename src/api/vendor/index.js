import express from 'express';
import controller from './vendor.controller';
import { authRequired } from '../../auth/auth.service';

let router = express.Router();

router.get('/', controller.index);
router.post('/', authRequired('admin'), controller.create);

module.exports = router;
