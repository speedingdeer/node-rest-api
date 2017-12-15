import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import routes from './routes';
import db from './db';
import config from './config';

// Populate databases with sample data
if (config.SEED_DB) { require('./config/seed'); }

const app = express();
app.disable('x-powered-by');

// View engine setup - it's a REST server but we render user friendly error this way
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));

app.use(jwt({ secret: config.SESSION_SECRET, credentialsRequired: false }), (req, res, next) => {
  if(req.user) {
    db.User.findById(req.user.id).then(user => {
      if(user) {
        req.user = user;
      } else { 
        // don't send 401 here
        return res.send(401, 'User not found');
      }
      return next();

    })
  } else {
    return next();
  }

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enable routing
routes(app);

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  // @TODO: Move to logger
  console.log(err) // eslint-disable-line no-console
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});

db.sequelize.sync()
  .then(() => {
    app.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}`)); // eslint-disable-line no-console
  })
  .catch(function(err) {
    // @TODO: Move to logger
    console.log('Server failed to start due to error: %s', err); // eslint-disable-line no-console
  });

// Expose app
exports = module.exports = app;

export default app;
