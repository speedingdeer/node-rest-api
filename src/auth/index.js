import express from 'express';
import controller from './auth.controller';

let router = express.Router();

router.post('/token', controller.token);

module.exports = router;
