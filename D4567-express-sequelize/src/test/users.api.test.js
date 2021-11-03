process.env.NODE_ENV = 'TEST'

let chai = require('chai')
let should = chai.should()
let server = require('../index')
let chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('Test Users API', () => {
  beforeEach(done => {
    done()
  })

  let token
  describe('POST /auth/login', () => {
    it('it should login and return token', done => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          "username": "vietnh",
          "password": "123"
        })
        .end((err, res) => {
          res.body.should.have.property('token')
          res.should.have.status(200)
          token = 'Bearer ' + res.body.token
          done()
        })
    })
  })

  describe('GET /users', () => {
    it('it should GET all users', done => {
      chai.request(server)
        .get('/api/v1/users')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.success.should.eql(true)
          res.body.data.should.be.a('array')
          done()
        })
    })
  })

  let user
  describe('POST /users', () => {
    it('it should CREATE a new user and customer', done => {
      chai.request(server)
        .post('/api/v1/users')
        .set('Authorization', token)
        .send({
            "username": "vietnh2",
            "password": "123",
            "age": 21,
            "email": "vietnh@vmodev.com",
            "phone": "0123456789",
            "address": "HN",
            "isActive": 1
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.success.should.eql(true)
          res.body.data.should.be.a('object')
          res.body.data.should.have.property('username').eql('vietnh2')
          res.body.data.should.have.property('customer').not.eql({})
          user = res.body.data
          done()
        })
    })
  })

  describe('GET /user/:id', () => {
    it('it should GET user details', done => {
      chai.request(server)
        .get(`/api/v1/users/${user.id}`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.data.should.have.property('customer').not.eql({})
          done()
        })
    })
  })

  describe('PATCH /user/:id/inactive', () => {
    it('it should set isActive to 0', done => {
      chai.request(server)
        .patch(`/api/v1/users/${user.id}/inactive`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.data.should.have.property('isActive').eql(0)
          done()
        })
    })
  })

  describe('PATCH /user/:id/active', () => {
    it('it should set isActive to 1', done => {
      chai.request(server)
        .patch(`/api/v1/users/${user.id}/active`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.data.should.have.property('isActive').eql(1)
          done()
        })
    })
  })

  describe('PUT /user/:id', () => {
    it('it should UPDATE user and customer', done => {
      user.isActive = 0
      user.customer.isActive = 0
      user.customer.paymentMethod = 1234567890


      chai.request(server)
        .put(`/api/v1/users/${user.id}`)
        .set('Authorization', token)
        .send({...user})
        .end((err, res) => {
          res.should.have.status(200)
          chai.request(server)
            .get(`/api/v1/users/${user.id}`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200)
              res.body.data.should.have.property('isActive').eql(0)
              res.body.data.should.have.property('customer')
              res.body.data.customer.should.have.property('isActive').eql(0)
              res.body.data.customer.should.have.property('paymentMethod').eql(1234567890)
              done()
            })
        })
    })
  })

  describe('DELETE /user/:id', () => {
    it('it should DELETE user', done => {
      chai.request(server)
        .delete(`/api/v1/users/${user.id}`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200)
          chai.request(server)
            .get(`/api/v1/users/${user.id}`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(404)
              done()
            })
        })
    })
  })
})