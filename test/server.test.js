const request = require('supertest');
const app = require('../app').app;
const expect = require('chai').expect;

describe('GET /', () => {
    it('respond with html', function(done) {
        request(app)
          .get('/')
          .set('Accept', 'text/html')
          .expect((res)=> {
           expect(res.body).to.eql({
            pageTitle: 'Home page',
            msg: 'Welcome to Home page'
           });
          })
          .expect(200, done);
      });
});
