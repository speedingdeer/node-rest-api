import request from 'supertest';
import app from './app.js';

describe('GET /404', () => {
  it('should return 404 for non-existent API and auth paths', async () => {
    await request(app).get('/api/404').expect(404);
    await request(app).get('/auth/404provider').expect(404);
  });
});
