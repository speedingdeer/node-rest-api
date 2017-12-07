module.exports = {
  PORT: process.env.PORT || 8080,
  DB: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'dev.sqlite',
      define: {
        timestamps: false
      }
    }
  }
}