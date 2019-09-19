const request = require('supertest');

const server = require('./server');

describe('server.js', () => {
  describe('GET /', () => {
    it('returns 200 OK', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return { hello: 'world' }", async () => {
      const res = await request(server).get('/');

      expect(res.body.hello).toBe('world');
    });

    it('returns JSON', done => {
      request(server)
        .get('/')
        .then(res => {
          expect(res.type).toMatch(/json/i);
          done();
        });
    });
  });

  describe('POST /consonants', () => {
    it('returns 201 Created', () => {
      return request(server)
        .post('/consonants')
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe('GET /consonants', () => {
    it('returns 200 OK', () => {
      return request(server)
        .get('/consonants')
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return { consonants: [...] }", async () => {
      const res = await request(server).get('/');

      expect(Array.isArray(res.body.consonants)).toBe(true);
    });
  });
});
