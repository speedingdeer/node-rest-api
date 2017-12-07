import express from 'express';
import config from './config';

export default function(app) {
  
  // @TODO: 
  // fill in the endpoint below
  // app.use('/api/users', require('./api/user'));
  // app.use('/auth', require('./auth'));

  app.use('/api/vendors', require('./api/vendor'));
  app.use('/uploads', express.static(config.UPLOADS));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth)/*')
   .get((req, res, next) => {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
   });

  // @TODO:
  // Should serve React app on production if env is 'prod'
  /*
  app.route('/*')
    .get((req, res) => {
      // res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });

  */
}
