const app = require('../../app')
const assert = require('assert')
const request = require('supertest').agent(app)

describe('User', () => {
  it('get bar should err', async () => {
    const { body } = await request.get('/users/bar').expect(200)
    assert.strictEqual(body.code, 500)
  })
})
