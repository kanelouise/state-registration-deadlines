const request = require('supertest')

describe('GET /api/states', () => {
  it('returns a list of states', async () => {
    const res = await request('https://state-registration-deadlines.vercel.app').get('/api/states')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body[0]).toHaveProperty('State')
  })
})