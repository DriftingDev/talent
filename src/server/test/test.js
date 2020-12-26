process.env.NODE_ENV = 'test'

const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

const {
  dropUsers,
  dropCompanies 
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
    dropCompanies()

    const producer = new User(defaultProducer) 
    const artist = new User(defaultArtist) 
    producer.save((err, user) => {
      producerToken = createToken(user)
    })
    artist.save((err, user) => {
      artistToken = createToken(user)
    })

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

  describe('Company Routes', () => {

    it("Should return 401 without a valid token attached", (done) => {
      chai.request(app)
        .post('/company/new')
        .send(null)
        .end((err, res) => {
          if (err) {
            console.log(err)
          }
          expect(res).to.have.status(401)
          done()
        })
    })

    let newCompanyId;

    describe("POST /new", () => {
      it("should create and return a new company with attached user ID from token", (done) => {
        chai.request(app)
          .post('/company/new')
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            name: "testCompany1"
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty("company")
            newCompanyId = res.body.company._id
            expect(res.body.company.users[0]).to.be.a("string")
            done()
          })
      })

      it("should return 500 without valid inputs", (done) => {
        chai.request(app)
          .post('/company/new')
          .set({"Authorization": `Bearer ${producerToken}`})
          .send(null)
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(500)
            done()
          })
      })
    })

    describe('GET /:id', () => {
      it('Should return a company with the ID matching the passed parameter', (done) => {
        chai.request(app)
          .get(`/company/${newCompanyId}`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('company')
            expect(res.body.company).to.not.equal(null)
            done()
          })
      })

      it("Should return 500 and a string if passed a non matching ID", (done) => {
        chai.request(app)
        .get('/company/:id')
        .set({"Authorization": `Bearer ${producerToken}`})
        .end((err, res) => {
          if (err) {
            console.log(err)
          }
          expect(res).to.have.status(500)
          expect(res.body).to.equal('No company found')
          done()
        })
      }) 
    })

    describe("POST /:id", () => {
      it("should update the name of the existing company and return the updated company", (done) => {
        chai.request(app)
          .post(`/company/${newCompanyId}`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            name: "company1"
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty("company")
            expect(res.body.company.name).to.equal("company1")
            done()
          })
      })

      it("should return 500 if passed an invalid id", (done) => {
        chai.request(app)
          .post(`/company/notanid`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            name: "company1"
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(500)
            done()
          })
      })
    })

    describe("GET /userCompanies", () => {
      it("should return all the companies tied to the user ID from the auth token", (done) => {
        chai.request(app)
          .get('/company/userCompanies')
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('companies')
            expect(res.body.companies.length).to.equal(1)
            done()
          })
      })

      it("should return and empty array if no companies are tied to a user ID", (done) => {
        chai.request(app)
          .get('/company/userCompanies')
          .set({"Authorization": `Bearer ${artistToken}`})
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('companies')
            expect(res.body.companies.length).to.equal(0)
            done()
          })
      })
    })

    describe("GET /companyUsers/:id", () => {
      it('Should return and array of users connected to the company', (done) => {
        chai.request(app)
          .get(`/company/companyUsers/${newCompanyId}`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err,res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty("users")
            expect(res.body.users.length).to.equal(1)
            done()
          })
      })

      it("Should return 500 and a string if no company matches the parameter ID", (done) => {
        chai.request(app)
          .get(`/company/companyUsers/notanid`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err,res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(500)
            expect(res.body).to.equal("No company found")
            done()
          })
      })
    })
  })

})