import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../app';
import db from '../../db';
import config from '../../config';
import { expect } from 'chai';

let user, token;

beforeAll(async () => {
  await db.sequelize.sync();
  user = await db.User.create({ email: 'user@example.com', password: 'user' });
  token = jwt.sign({ id: user.id }, config.SESSION_SECRET);
});


describe('GET /users/me', () => {
  it('returns 401 if not authorized', async () => {
    await request(app).get('/api/users/me')
      .expect(401);
  });
  it('should return \'me\' without sensitive information', async () => {
    await request(app).get('/api/users/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect(res =>  {
        expect(res.body.salt).to.be.undefined;
        expect(res.body.password).to.be.undefined;
        expect(res.body.profile).to.not.be.null;
        expect(res.body.token).to.not.be.null;
      })
  });
});

afterAll(async () => {
  await user.destroy();
});