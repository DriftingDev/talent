const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const { expect } = chai;

chai.use(chaiHttp);

process.env.NODE_ENV = 'test'

describe("Auth routes" () => {
  
  describe('POST /register', () => {
    it('should add a new user to the DB if details are valid and return 200 OK'), (done) => {
      chai.request(app)
        .post('/register')
        .type('form')
        .send({
          '_method': 'put',
          'email': "user@email.com",
          'password':  "password",
          'name': 'nick',
          'nickname': 'funky duck',
          'is_artist': false
        })
    }
  })

})