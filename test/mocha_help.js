const app = require('../app.js')
global.request = require('supertest').agent(app)
global.assert = require('assert')
global.prefix = require('../utils/Constant').prefix

before(function () {
  // runs before all tests in this block
})

after(function () {
  // runs after all tests in this block
})

beforeEach(function () {
  // runs after each test in this block
})

afterEach(function () {
  // runs after each test in this block
})
