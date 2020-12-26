process.env.NODE_ENV = 'test'

const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

const {
  dropUsers 
} = require('./test_utils/test_utils');


const { expect } = chai;

chai.use(chaiHttp);



describe('Route testing', () => {

  const defaultProducer = {
    accname: "producer",
    email: "producer",
    password: "producer"
  }

  const defaultArtist = {
    accname: "artist",
    email: "artist",
    password: "artist"
  }

  const createToken = (user) => {
    body = { _id: user._id, email: user.email, is_artist: user.is_artist };
    token = jwt.sign({ user: body }, 'BERNARD_IS_BEST');

    return token
  }

  let producerToken;
  let artistToken;

  before((done) => {
    dropUsers()

    const producer = new User(defaultProducer) 
    const artist = new User(defaultArtist) 
    producer.save()
    artist.save()

    producerToken = createToken(defaultProducer)
    artistToken = createToken(defaultArtist)

    done()
      
  })

  

  ////////// AUTH ROUTES /////////////
  describe('Auth Routes', () => {    

    describe("POST /register/", () => {

      it('Should respond with 200 and return valid user with valid input', (done) => {
        chai.request(app)
          .post('/auth/register')
          .send({
            accname: "test1",
            email: "test1",
            password: "test1"
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty("user")
            done()
          })
      })

      it('Should return 400 and an error message without valid user input', (done) => {
        chai.request(app)
        .post('/auth/register')
        .send(null)
        .end((err, res) => {
          if (err) {
            console.log(err)
          }
          expect(res).to.have.status(400)
          expect(res).to.haveOwnProperty("error")
          done()
        })
      })

    })

    describe('POST login', () => {
      it('Should return 200, a valid JWT and the user object for a valid login', (done) => {
        chai.request(app)
          .post('/auth/login')
          .send({
            email: "test1",
            password: "test1"
          })
          .end((err, res) => {
            if(err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('token')
            expect(res.body).to.haveOwnProperty('user')
            done()
          })
      })

      it('Should return 500 without a valid user object', (done) => {
        chai.request(app)
          .post('/auth/login')
          .send(null)
          .end((err, res) => {
            if(err) {
              console.log(err)
            }
            expect(res).to.have.status(500)
            done()
          })
      })
    })
    
  }) 

})