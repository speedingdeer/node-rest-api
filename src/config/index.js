import path from 'path'

// @TODO: Load TEST | DEV | PROD from environemnt folder

module.exports = {
  PORT: process.env.PORT || 8888,
  DB: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'dev.sqlite',
      define: {
        timestamps: false
      }
    }
  },
  NODE_ENV: process.env.NODE_ENV || 'dev',
  UPLOADS: process.env.UPLOADS || path.join(__dirname, '../../uploads'),
  SESSION_SECRET: process.env.SESSION_SECRET || 'secret'
}