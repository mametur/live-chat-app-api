import request from 'supertest'; // simulates a real request, which goes through the entire Express pipeline.
import app from '../src/app'; 

// integration test
describe('API Routes', () => {
  it('should return all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.text).toBe('User Route: Get all users');
  });
});
