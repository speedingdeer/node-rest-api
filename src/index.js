import app from './app';
import db from './db';
import config from './config';
import seed from './config/seed';

// @TODO: Load the propert configuartion: DEV | TEST | PROD

(async () => {
  await db.sequelize.sync();
  if(config.SEED_DB) { await seed(); }
  app.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}`));
})();
