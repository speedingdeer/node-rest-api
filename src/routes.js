import { Router } from 'express';

const routes = Router();

export default function(app) {
  
  // @TODO: 
  // fill in the endpoint below
  // app.use('/api/users', require('./api/user'));
  // app.use('/auth', require('./auth'));

  // Routes
  app.use('/', routes);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth)/*')
   .get((req, res, next) => {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
   });

  // @TODO:
  // Should serve React app on production
  app.route('/*')
    .get((req, res) => {
      // res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
