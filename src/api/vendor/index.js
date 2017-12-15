import express from 'express';
import controller from './vendor.controller';
import { isAuthorised } from '../../auth/auth.service';

let router = express.Router();

router.get('/', controller.index);
router.post('/', isAuthorised('admin'), controller.create);

module.exports = router;
