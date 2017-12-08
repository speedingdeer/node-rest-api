import express from 'express';
import controller from './offer.controller';

let router = express.Router();

router.get('/', controller.index);

module.exports = router;
