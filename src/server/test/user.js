process.env.NODE_ENV = 'test'
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../server');
const mongoose = require('mongoose')
const User = require('../models/User.js')

const { expect } = chai;

chai.use(chaiHttp);

describe("User routes", () => {
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

  let userObject = {}

  for (let index = 0; index < 11; index++) {
    userObject.email = `email${index}@email.com`
    userObject.name = `username${index}`
    userObject.password = `password${index}`
    if (index % 2 == 1) {
      userObject.is_artist = true
    }

    new User(userObject).save((err,user) => {
      if (err) {
        console.log(err)
      }
    })
  }

  describe("GET /all", () => {
    it('should return all users', (done) => {
      chai.request(app)
        .get('/all')
        .end((err,res) => {
          if (err) {
            console.log(err)
          }
          expect(res).to.have.status(200)
        })
    })
  })

  describe("GET /allArtists", () => {
    it('should return only artists tied to user', (done) => {
      chai.request(app)
        .get('/allArtists')
        .end((err,res) => {
          if (err) {
            console.log(err)
          }
          expect(res).to.have.status(200)
        })
    })
  })

  describe("GET /allProducers", () => {
    it('should return only producers tied to user', (done) => {
      chai.request(app)
        .get('/allProducers')
        .end((err,res) => {
          if (err) {
            console.log(err)
          }
          expect(res).to.have.status(200)
        })
    })
  })

  describe("GET /:id", () => {
    it('should return only one specific user', (done) => {
      chai.request(app)
        .get('/5')
        .end((err,res) => {
          if (err) {
            console.log(err)
          }
          expect(res).to.have.status(200)
        })
    })
  })

  describe("POST /:id", () => {
    it('should modify logged in user details and update', (done) => {
    const newDetails = {
      name: "new name",
      email: 'newemail@email.com'
    }

    chai.request(app)
        .post('/5')
        .send(newDetails)
        .end((err,res) => {
          if (err) {
            console.log(err)
          }
          expect(res).to.have.status(200)
        })      
    })
  })

  describe("POST /:id/company", () => {
    it('should add a company to a specific user', (done) => {
      chai.request(app)
        .post('/5')
        .send('1')
        .end((err,res) => {
          if (err) {
            console.log(err)
          }
          expect(res).to.have.status(200)
          expect(res.user.companies[0]).to.be.an('object')
        })
    })
  })

  describe("DELETE /:id", () => {
    it('should delete profile of logged in user', (done) => {
      chai.request(app)
        .delete('/5')
        .end((err,res) => {
          if (err) {
            console.log(err)
          }
          expect(res).to.have.status(200)
          expect(res.user).to.be(null)
        })
    })
  })
  
})