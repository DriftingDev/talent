if(process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV = 'test'
  require('dotenv').config();
}

const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const User = require('../models/User.js')
const Show = require('../models/Show')
const Venue = require('../models/Venue')
const Company = require('../models/Company')


const {
  dropUsers,
  dropCompanies,
  dropShows,
  dropVenues
} = require('./test_utils/test_utils');
const { post } = require('../routes/authRouter');

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
    password: "artist",
    is_artist: true
  }

  const createToken = (user) => {
    user.password = null
    token = jwt.sign({ user: user }, process.env.JWT_SECRET);

    return token
  }

  let producerToken;
  let artistToken;
  let producerId;
  let artistId;

  before((done) => {
    dropUsers()
    dropCompanies()
    dropShows()
    dropVenues()

    const producer = new User(defaultProducer) 
    const artist = new User(defaultArtist) 
    producer.save((err, user) => {
      producerId = user._id
      producerToken = createToken(user)
    })
    artist.save((err, user) => {
      artistId = user._id
      artistToken = createToken(user)
    })

    done()
      
  })

  let userID;
  let newUserId;
  let newCompanyId;
  let newVenueId;
  let newShowId;

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
            newUserId = res.body.user._id
            done()
          })
      }).timeout(5000)

      it('Should return 400 and an error message without username or password', (done) => {
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

      it('Should return 500 and a matching string without any email or password fields', (done) => {
        chai.request(app)
          .post('/auth/login')
          .send(null)
          .end((err, res) => {
            if(err) {
              console.log(err)
            }
            expect(res).to.have.status(500)
            expect(res.body.message).to.equal("Missing credentials")
            done()
          })
      })

      it('Should return 500 and a matching string if no user is found', (done) => {
        chai.request(app)
          .post('/auth/login')
          .send({
            email: "incorrect",
            password: "irrelevant"
          })
          .end((err, res) => {
            if(err) {
              console.log(err)
            }
            expect(res).to.have.status(500)
            expect(res.body.message).to.equal("User not found")
            done()
          })
      })

      it('Should return 500 and a matching string if password is incorrect', (done) => {
        chai.request(app)
          .post('/auth/login')
          .send({
            email: "test1",
            password: "wrong"
          })
          .end((err, res) => {
            if(err) {
              console.log(err)
            }
            expect(res).to.have.status(500)
            expect(res.body.message).to.equal("Wrong password")
            done()
          })
      })
    })

    describe('GET /checkToken', () => {
      it("Should return 200 and the user object that matches the token", (done) => {
        chai.request(app)
          .get('/auth/checkToken')
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('user')
            expect(res.body.user.accname).to.equal('producer')
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

    describe("POST /new", () => {
      it("should create and return a new company with attached user ID from token", (done) => {
        chai.request(app)
          .post('/company/new')
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            name: "testCompany1",
            red61_username: "testUsername",
            red61_password: "testPassword"
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty("company")
            newCompanyId = res.body.company._id
            expect(res.body.company.users[0]).to.be.a("string")
            // bcrypt.compare("testUsername", res.body.company.red61_username, (err,same) => {
            //   expect(same).to.be.true
            //   bcrypt.compare("testPassword", res.body.company.red61_password, (err, same) => {
            //     expect(same).to.be.true
            //     done()
            //   })
            // })
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
      it("should update the name, username and password of the existing company and return the updated company", (done) => {
        chai.request(app)
          .post(`/company/${newCompanyId}`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            name: "company1",
            red61_password: "newPassword",
            red61_username: "newUsername"
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty("company")
            expect(res.body.company.name).to.equal("company1")
            expect(res.body.company.red61_password).to.equal("newPassword")
            expect(res.body.company.red61_username).to.equal("newUsername")
            // bcrypt.compare('newUsername', res.body.company.red61_username, (err,same) => {
            //   expect(same).to.be.true
            //   bcrypt.compare("newPassword", res.body.company.red61_password, (err, same) => {
            //     expect(same).to.be.true
            //     done()
            //   })
            // })
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

  describe("User Routes", () => {

    it("should return 401 without a valid token", (done) => {
      chai.request(app)
        .get('/user/all')
        .end((err,res) => {
          expect(res).to.have.status(401)
          done()
        })
    })

    describe("GET /all", () => {
      it("Should return all users in the db", (done) => {
        chai.request(app)
          .get('/user/all')
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err,res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('users')
            expect(res.body.users.length).to.equal(3)
            userID = res.body.users[0]._id
            done()
          })
      })
    })

    describe("GET /:id", () => {
      it("Should return a single user matching the params ID", (done) => {
        chai.request(app)
          .get(`/user/${userID}`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err,res) => {
            if(err){
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty("user")
            expect(res.body.user._id).to.equal(userID)
            done()
          })
      })

      it("Should return 500 and a string if no user matches the params ID", (done) => {
        chai.request(app)
          .get(`/user/notanid`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err,res) => {
            if(err){
              console.log(err)
            }
            expect(res).to.have.status(500)
            expect(res.body).to.equal("No user found")
            done()
          })
      })
    })

    describe("POST /edit", () => {
      it("Should modify and return the details of the user passed by the token", (done) => {
        chai.request(app)
          .post('/user/edit')
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            accname: "producer1"
          })
          .end((err,res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty("user")
            expect(res.body.user.accname).to.equal("producer1")
            done()
          })
      })
    })

    describe("POST /validPassword", () => {
      it('should return true when given a matching password to the token user', (done) => {
        chai.request(app)
          .post('/user/validPassword')
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            password: "producer"
          })
          .end((err,res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty("passwordBool")
            expect(res.body.passwordBool).to.be.true
            done()
          })
      })

      it('should return false when given a non-matching password to the token user', (done) => {
        chai.request(app)
          .post('/user/validPassword')
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            password: "wrong"
          })
          .end((err,res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty("passwordBool")
            expect(res.body.passwordBool).to.be.false
            done()
          })
      })
    })

    describe("POST /:id/addCompany", () => {
      it('Should return 500 and a matching string if an invalid company ID is passed', (done) => {
        chai.request(app)
          .post(`/user/${newUserId}/addCompany`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            company_id: "notanID"
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(500)
            expect(res.body).to.equal("No company found")
            done()
          })
      })

      it('Should add the user according to the params to the company sent through the body', (done) => {
        chai.request(app)
          .post(`/user/${newUserId}/addCompany`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            company_id: newCompanyId
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty("user")
            expect(res.body).to.haveOwnProperty("company")
            const lastItem = res.body.company.users.length - 1
            expect(res.body.company.users[lastItem]).to.equal(newUserId)
            expect(res.body.user.companies[0]).to.equal(newCompanyId)
            done()
          })
      })

      it('Should return 500 and a matching string if user already belongs to company', (done) => {
        chai.request(app)
          .post(`/user/${newUserId}/addCompany`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            company_id: newCompanyId
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(500)
            expect(res.body).to.equal("Company already belongs to user")
            done()
          })
      })

      it('Should return 500 and a matching string if an invalid user id is passed', (done) => {
        chai.request(app)
          .post(`/user/notanid/addCompany`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            company_id: newCompanyId
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(500)
            expect(res.body).to.equal("No user found")
            done()
          })
      })      
    })
  })

  describe("Venue Routes", () => {
    it("should return 401 if no valid token is set", (done) => {
      chai.request(app)
        .post('/venue/new')
        .send(null)
        .end((err,res) => {
          expect(res).to.have.status(401)
          done()
        })
    })

    describe("POST /new/", () => {
      it('should create and return 200, a venue and its company with valid inputs', (done) => {
        chai.request(app)
          .post('/venue/new')
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            company: newCompanyId,
            name: "company1"
          })
          .end((err,res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('venue')
            newVenueId = res.body.venue._id
            expect(res.body).to.haveOwnProperty('company')
            expect(res.body.venue.company).to.equal(newCompanyId)
            expect(res.body.company.venues[0]).to.equal(newVenueId)
            done()
          })
      })

      it('should return 500 and a matching string without valid inputs', (done) => {
        chai.request(app)
          .post('/venue/new')
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            company: "notanid",
            name: "company1"
          })
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

    describe("GET /:id/", () => {
      it("should return a single venue with a valid id parameter", (done) => {
        chai.request(app)
          .get(`/venue/${newVenueId}`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('venue')
            expect(res.body.venue._id).to.equal(newVenueId)
            done()
          })
      })

      it("should return a 500 and a matching string if no venue is found", (done) => {
        chai.request(app)
          .get(`/venue/notanid`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.equal('No venue found')
            done()
          })
      })
    })

    describe("POST /:id", () => {
      it("should return 200 and the updated venue object with valid input", (done) => {
        chai.request(app)
          .post(`/venue/${newVenueId}`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            name: "testVenue"
          })
          .end((err,res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('venue')
            expect(res.body.venue.name).to.equal('testVenue')
            done()
          })
      })

      it("should return 500 if passed an invalid venue parameter", (done) => {
        chai.request(app)
          .post(`/venue/notanid`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            name: "testVenue"
          })
          .end((err,res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(500)
            expect(res.body).to.equal('No venue found')
            done()
          })
      })
    })

    describe("GET /venuesByCompany/:id", () => {
      it("should return 200 and an array of unique venues attached to a company", (done) => {
        chai.request(app)
          .get(`/venue/venuesByCompany/${newCompanyId}`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err,res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('venues')
            expect(res.body.venues.length).to.equal(1)
            done()
          })
      })

      it("should return 500 and a matching string if the company id is not valid", (done) => {
        chai.request(app)
          .get(`/venue/venuesByCompany/notanid`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err,res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(500)
            expect(res.body).to.equal('No venues found')
            done()
          })
      })

      it("should return 401 if the token is attached to an artist user", (done) => {
        chai.request(app)
          .get(`/venue/venuesByCompany/${newCompanyId}`)
          .set({"Authorization": `Bearer ${artistToken}`})
          .end((err,res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(401)
            done()
          })
      })
    })

    describe("GET /venuesByUser/", () => {
      it("Should return 500 and a matching string if no venues are attached to the token user", (done) => {
        chai.request(app)
          .get('/venue/venuesByUser')
          .set({"Authorization": `Bearer ${artistToken}`})
          .end((err,res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.equal('No venues attached to user')
            done()
          })
      })

      it("Should return 200 and a unique array of venues attached to the token user", (done) => {
        const show = new Show({
          company: newCompanyId,
          artists: artistId,
          showName: "show1",
          datetime: 1609113488
        })

        show.save((err, show) => {
          chai.request(app)
            .get('/venue/venuesByUser')
            .set({"Authorization": `Bearer ${artistToken}`})
            .end((err,res) => {
              expect(res).to.have.status(200)
              expect(res.body).to.be.an('array')
              expect(res.body.length).to.equal(1)
              done()
            })
        })
      })
    })
  })

  describe("Show Routes", () => {
    it("should return 401 if no valid token is set", (done) => {
      chai.request(app)
        .post('/show/new')
        .send(null)
        .end((err,res) => {
          expect(res).to.have.status(401)
          done()
        })
    })

    describe("POST /new/", () => {
      it("Should return 200 and a new show object with valid inputs", (done) => {
        chai.request(app)
          .post('/show/new')
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            company: newCompanyId,
            showName: "show2",
            datetime: 1609123653,
            venue: newVenueId
          })
          .end((err,res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('show')
            newShowId = res.body.show._id
            done()
          })
      })

      it("Should return 500 and a matching string no company found with invalid company ID", (done) => {
        chai.request(app)
          .post('/show/new')
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            company: "notanid",
            showName: "show2",
            datetime: 1609123653
          })
          .end((err,res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(500)
            expect(res.body).to.equal('No company found')
            done()
          })
      })

      it("Should return 500 with invalid inputs", (done) => {
        chai.request(app)
          .post('/show/new')
          .set({"Authorization": `Bearer ${producerToken}`})
          .send(null)
          .end((err,res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(500)
            done()
          })
      })
    })

    describe("GET /:id", () => {
      it("Should return 200 and the show object with a valid ID param", (done) => {
        chai.request(app)
          .get(`/show/${newShowId}`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty("show")
            expect(res.body.show._id).to.equal(newShowId)
            done()
          })
      })

      it("Should return 500 and a matching string with an invalid parameter", (done) => {
        chai.request(app)
          .get(`/show/notanID`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(500)
            expect(res.body).to.equal('No show found')
            done()
          })
      })
    })

    describe("POST /:id", () => {
      it("Should return 200 and the updated show object with valid input", (done) => {
        chai.request(app)
          .post(`/show/${newShowId}`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            showName: "testShow1"
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('show')
            expect(res.body.show.showName).to.equal('testShow1')
            done()
          })
      })

      it("Should return 500 and a matching string if given an invalid ID", (done) => {
        chai.request(app)
          .post(`/show/notanid`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .send({
            showName: "testShow1"
          })
          .end((err, res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(500)
            expect(res.body).to.equal('No show found')
            done()
          })
      })
    })

    describe("GET /showsByCompany/:id", () => {
      it("Should return 200 and an array of shows attached to the passed company id", (done) => {
        chai.request(app)
          .get(`/show/showsByCompany/${newCompanyId}`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err,res) => {
            if(err){
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('shows')
            expect(res.body.shows).to.be.an('array')
            expect(res.body.shows.length).to.equal(2)
            done()
          })
      })

      it("Should return 200 and an empty array if no matches", (done) => {
        const testCompany = new Company({name: "testCompany"})
        testCompany.save((err, testCompany) => {
          chai.request(app)
            .get(`/show/showsByCompany/${testCompany._id}`)
            .set({"Authorization": `Bearer ${producerToken}`})
            .end((err,res) => {
              if(err){
                console.log(err)
              }
              expect(res).to.have.status(200)
              expect(res.body).to.haveOwnProperty('shows')
              expect(res.body.shows).to.be.an('array')
              expect(res.body.shows.length).to.equal(0)
              done()
            })
        })
      })

      it("Should return 500 if passed an invalid id", (done) => {
        chai.request(app)
          .get(`/show/showsByCompany/notanId`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err,res) => {
            if(err){
              console.log(err)
            }
            expect(res).to.have.status(500)
            done()
          })
      })

      it("Should return 401 passed an artist token", (done) => {
        chai.request(app)
          .get(`/show/showsByCompany/notanId`)
          .set({"Authorization": `Bearer ${artistToken}`})
          .end((err,res) => {
            if(err){
              console.log(err)
            }
            expect(res).to.have.status(401)
            done()
          })
      })
    })

    describe("GET /showsByUser/:id", () => {
      it("Should return 200 and array of shows by id if passed producer token", (done) => {
        chai.request(app)
          .get(`/show/showsByUser/${artistId}`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err,res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('shows')
            expect(res.body.shows.length).to.equal(1)
            done()
          })
      })

      it("Should return 200 and array of shows by artist token id if passed artist token", (done) => {
        chai.request(app)
          .get(`/show/showsByUser/${producerId}`)
          .set({"Authorization": `Bearer ${artistToken}`})
          .end((err,res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('shows')
            expect(res.body.shows.length).to.equal(1)
            done()
          })
      })

      it("Should return 200 and empty array of shows by id if passed producer token and no matches", (done) => {
        chai.request(app)
          .get(`/show/showsByUser/${producerId}`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err,res) => {
            if (err) {
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('shows')
            expect(res.body.shows.length).to.equal(0)
            done()
          })
      })
    })
  })

  //DO THESE LAST
  describe("Delete routes", () => {
    describe('DELETE /show/:id', () => {
      it("Should delete the show, return 200 and a matching string", (done) => {
        chai.request(app)
          .delete(`/show/${newShowId}`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err, res) => {
            if(err){
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.equal("Show deleted")
            Show.findById(newShowId, (err,show) => {
              expect(show).to.equal(null)
              done()
            })
          })
      })
    })

    describe("DELETE /venue/:id", () => {
      it("Should delete the venue, return 200 and a matching string", (done) => {
        chai.request(app)
          .delete(`/venue/${newVenueId}`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err, res) => {
            if(err){
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.equal("Venue deleted")
            Venue.findById(newVenueId, (err,venue) => {
              expect(venue).to.equal(null)
              done()
            })
          })
      })
    })

    describe("DELETE /company/:id", () => {
      it("Should delete the company, return 200 and a matching string", (done) => {
        chai.request(app)
          .delete(`/company/${newCompanyId}`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err, res) => {
            if(err){
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.equal("Company deleted")
            Company.findById(newCompanyId, (err,venue) => {
              expect(venue).to.equal(null)
              done()
            })
          })
      })
    })

    describe("DELETE /user/delete", () => {
      it("Should delete the user by the token, return 200 and a matching string", (done) => {
        chai.request(app)
          .delete(`/user/delete`)
          .set({"Authorization": `Bearer ${producerToken}`})
          .end((err, res) => {
            if(err){
              console.log(err)
            }
            expect(res).to.have.status(200)
            expect(res.body).to.equal("User deleted")
            User.findById(producerId, (err,user) => {
              expect(user).to.equal(null)
              done()
            })
          })
      })
    })
  })

})

/// .set({"Authorization": `Bearer ${producerToken}`})