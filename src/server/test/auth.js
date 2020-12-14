process.env.NODE_ENV = 'test'

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const mongoose = require('mongoose')
const { User } = require('../models/User.js')

const { expect } = chai;

chai.use(chaiHttp);

describe("Auth routes", () => {

  let validUserObject = {
    '_method': 'put',
    'email': "user@email.com",
    'password':  "password",
    'name': 'nick',
    'nickname': 'funky duck',
    'is_artist': false
  }
 
  describe('POST /register', () => {

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

    it('should return 200OK with valid inputs'), (done) => {
      chai.request(app)
        .post('/auth/register')
        .type('form')
        .send(validUserObject)
        .end((err, res) => {
          expect(res).to.have.status(200)
          done()
        })
    }

    it('should not return 200OK without valid inputs'), (done) => {
      validUserObject.password = ""
      chai.request(app)
        .post('/auth/register')
        .type('form')
        .send(validUserObject)
        .end((err, res) => {
          expect(res).to.not.have.status(200)
          done()
        })
    }

    it('should have inserted a new user into the DB', (done) => {
      const firstUser = User.find()
      expect(firstUser).to.be.an('array'),
      expect(firstUser[0].email).to.equal('user@email.com')
      done()
    })
  })

  describe('POST /login', () => {

    const newUser = new User ({
      'email': "user@email.com",
      'password':  "password",
      'name': 'nick',
      'nickname': 'funky duck',
      'is_artist': false
    })

    newUser.save((err) => {
      console.log("New user didnt save:", err)
    })
    
    let validUserLogin = {
      "email": "user@email.com",
      "password": "password"
    }

    it('should return 200OK with valid inputs and have a user attached'), (done) => {
      chai.request(app)
        .post('/auth/register')
        .type('form')
        .send(validUserLogin)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.user).to.not.be.null
          done()
        })
    }

    it('should not return 200OK with invalid inputs'), (done) => {
      chai.request(app)
        .post('/auth/register')
        .type('form')
        .send(validUserLogin)
        .end((err, res) => {
          expect(res).not.to.have.status(200)
          expect(res.user).to.not.be.null
          done()
        })
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
    }

  })

})