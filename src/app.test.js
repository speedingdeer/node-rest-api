import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from './app';
import db from './db';
import config from './config';

let user, token;

beforeAll(async () => {
  await db.sequelize.sync();
  user = await db.User.create({email: 'user@example.com', password: 'user'});
  token = jwt.sign({ id: user.id }, config.SESSION_SECRET);
});

describe('App AUTH / access', () => {
  it('should let in user without a token', async () => {
    await request(app).get('/').expect(200);
  });
  it('should let in user with a valid token', async () => {
    await request(app).get('/')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
  it('should throw 401 if token is invalid', async () => {
    await request(app).get('/')
      .set('Authorization', 'Bearer BROKEN TOKEN')
      .expect(401);
  });

});


afterAll(async () => {
  await user.destroy({})
});