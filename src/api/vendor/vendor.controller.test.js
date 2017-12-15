import request from 'supertest';
import app from '../../app';
import seed from '../../config/seed';
import { expect } from 'chai';

beforeAll(async () => {
  // it doesn't need to be wait here,
  // it's OK if it does return a promise but I like to keep it consistnt
  await seed();
});


describe('GET /vendors', () => {
  it('should list avaiable vendors', async () => {
    await request(app).get('/api/vendors')
      .expect(200)
      .expect(res =>  {
        // they are three vendors seeded, maybe it's better to not seed but explictly insert 
        // some vendors here
        expect(res.body).to.have.length(3);
      })
  });
  it('should process the limit param', async () => {
    await request(app).get('/api/vendors?limit=2')
      .expect(200)
      .expect(res =>  {
        expect(res.body).to.have.length(2);
      })
  });
});
