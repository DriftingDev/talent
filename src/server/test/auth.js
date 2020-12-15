process.env.NODE_ENV = 'test'

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const mongoose = require('mongoose')
const User = require('../models/User.js')

const { expect } = chai;

chai.use(chaiHttp);

describe("Auth routes", () => {

  const userObject = {
    'name': 'nick',
    'nickname': 'funky duck',
    'is_artist': false,
    'email': "user@email.com",
    'password':  "password"
  }

  let validUserLogin = {
    "email": "user@email.com",
    "password": "password"
  }

  const userSave = (user) => {
    const newUser = new User ({
      ...user
    })

    newUser.save((err) => {
      if (err) {
        console.log("New user didnt save:", err)
      } 
    })
  }

  after(() => {
    console.log('dropping db') 
    User.deleteMany({},(err) => {
      if (err) {
        console.log('There was a problem clearing the DB:', err)
      } else {
        console.log('DB successfully dropped')
      }
    }
  )})
 
  describe('POST /register', () => {

    it('should return 200OK with valid inputs'), (done) => {
      chai.request(app)
        .post('/auth/register')
        .send(userObject)
        .end((err, res) => {
          res.should.have.status(200)
        })
        done()
    }

    it('should not return 200OK without valid inputs'), (done) => {
      chai.request(app)
        .post('/auth/register')
        .type('form')
        .send({nothing: "nadie"})
        .end((err, res) => {
          expect(res).to.not.have.status(200)
        })
        done()
    }

    it('should have inserted a new user into the DB', async () => {
      const firstUser = await User.find()
      expect(firstUser).to.be.an('array'),
      expect(firstUser[0].email).to.equal('user@email.com')
    })
  })

  describe('POST /login', () => {

    // userSave(userObject)
    
    it('should return 200OK with valid inputs and have a user attached'), (done) => {
      chai.request(app)
        .post('/auth/login')
        .type('form')
        .send(validUserLogin)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.user).to.not.be.null
        })
        done()
    }

    it('should not return 200OK with invalid inputs'), (done) => {
      chai.request(app)
        .post('/auth/login')
        .type('form')
        .send(validUserLogin)
        .end((err, res) => {
          expect(res).not.to.have.status(200)
          expect(res.user).to.not.be.null
        })
        done()
    }
  })

  describe('GET /logout', () => {

    it('should return an empty user'), (done) => {
      chai.request(app)
        .get('/auth/logout')
        .end((err, res) => {
          expect(res).not.to.have.status(200)
          expect(res.user).to.be.null
        })
        done()
    }

  })

})