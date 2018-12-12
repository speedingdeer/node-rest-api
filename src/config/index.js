import path from 'path'

const NODE_ENV = process.env.NODE_ENV || 'dev';

const DEFAULT_CONFIG =  {
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
  NODE_ENV: NODE_ENV,
  UPLOADS: process.env.UPLOADS || path.join(__dirname, '../../uploads'),
  SESSION_SECRET: process.env.SESSION_SECRET || 'secret'
}

Object.assign(DEFAULT_CONFIG, require(`./enviroments/${NODE_ENV}env`).default);

export default DEFAULT_CONFIG