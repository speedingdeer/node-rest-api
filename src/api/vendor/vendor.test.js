import request from 'supertest';
import app from './../../app.js';

describe('GET /vendors', () => {
  it('should list avaiable vendors', async () => {
    await request(app).get('/api/vendors').expect(200);
  });
});
