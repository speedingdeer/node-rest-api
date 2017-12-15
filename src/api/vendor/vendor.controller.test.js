import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../app';
import db from '../../db';
import config from '../../config';
import { expect } from 'chai';

let admin, user, user_token, admin_token;

beforeEach(async () => {
  // it doesn't need to be wait here,
  // it's OK if it does return a promise but I like to keep it consistnt
  await db.sequelize.sync();
  await db.Vendor.create({name: 'vendor 1'});
  await db.Vendor.create({name: 'vendor 2'});
  await db.Vendor.create({name: 'vendor 3'});
  await db.Vendor.create({name: 'vendor 4'});
  user = await db.User.create({ email: 'user@example.com', password: 'user' });
  admin = await db.User.create({ email: 'admin@example.com', password: 'admin', role: 'admin' });
  user_token = jwt.sign({ id: user.id }, config.SESSION_SECRET);
  admin_token = jwt.sign({ id: admin.id }, config.SESSION_SECRET);
});


describe('GET /vendors', () => {
  it('should list avaiable vendors', async () => {
    await request(app).get('/api/vendors')
      .expect(200)
      .expect(res =>  {
        expect(res.body).to.have.length(4);
      })
  });
  it('should process the limit param', async () => {
    await request(app).get('/api/vendors?limit=2')
      .expect(200)
      .expect(res =>  {
        expect(res.body).to.have.length(2);
      })
  });
  it('should not allow to post if not authorised', async () => {
    await request(app).post('/api/vendors')
       .send({ name: 'new vendor' })
      .expect(401)
  });
  it('shoud forbid if not admin', async () => {
    await request(app).post('/api/vendors')
      .send({ name: 'new vendor' })
      .set('Authorization', `Bearer ${user_token}`)
      .expect(403)
  });
    it('should create if admin', async () => {
    await request(app).post('/api/vendors')
      .send({ name: 'new vendor' })
      .set('Authorization', `Bearer ${admin_token}`)
      .expect(200)
      .expect(res =>  {
        expect(res.body.name).to.equal('new vendor')
      })
  });
})

afterEach(async () => {
  await user.destroy();
  await admin.destroy();
  await db.Vendor.destroy({ where: {} });
});