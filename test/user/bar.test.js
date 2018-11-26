describe('User', () => {
  it('get bar should err', async () => {
    const { body } = await request.get(`${prefix}/users/bar`).expect(200)
    assert.strictEqual(body.code, 500)
  })
})
