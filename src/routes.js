import express from 'express';
import config from './config';
import path from 'path';

export default function(app) {
  
  // @TODO: 
  // fill in the endpoint below
  // app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));
  app.use('/api/vendors', require('./api/vendor'));
  app.use('/api/offers', require('./api/offer'));
  app.use('/uploads', express.static(config.UPLOADS));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth)/*')
   .get((req, res, next) => {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
   });


  // @TODO: add flag if production 'prod'
  // Serve on production
  app.use('/static', express.static(path.join(__dirname, '../../client/build/static')));
  app.route('/favicon.ico').get((req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, '../../client/build/favicon.ico')));
  });
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(path.join(__dirname, '../../client/build/index.html')));
    });

}
