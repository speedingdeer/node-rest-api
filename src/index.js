import app from './app';
import db from './db';
import config from './config';
import seed from './config/seed';

(async () => {
  await db.sequelize.sync();
  if(config.NODE_ENV !== 'prod') { await seed(); }
  app.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}`)); // eslint-disable-line no-console
})();
