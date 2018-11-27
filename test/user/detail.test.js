const userPrefix = `${prefix}/users`

describe('User', () => {
  it('get detail should success', async () => {
    const { body } = await request.get(`${userPrefix}/asd`).expect(200)
    assert.strictEqual(body.code, 0)
    assert.strictEqual(body.data.userId, 'asd')
  })
})
