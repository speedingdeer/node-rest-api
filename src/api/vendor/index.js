import express from 'express';
import controller from './vendor.controller';
import { authRequired } from '../../auth/auth.service';

let router = express.Router();

router.get('/', controller.index);
router.get('/:id', authRequired(), controller.get);
router.post('/', authRequired('admin'), controller.create);
router.put('/:id', authRequired('admin'), controller.update);;
router.delete('/:id', authRequired('admin'), controller.destroy);



module.exports = router;
