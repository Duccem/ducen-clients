describe('GET /api', () => {
  it('hello world', () => {
    cy.visit('http://localhost:4200/auth/login').then(() => {
      expect(true).to.be.true;
    });
  });
});
