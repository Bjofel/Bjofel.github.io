describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000') // change URL to match your dev URL
    cy.get("ul.s-Uap-jPRb-uiE > :nth-child(1)").click()
    cy.get(".bg-transparent").click()
    cy.wait(10000)
    cy.get("ul.s-Uap-jPRb-uiE > :nth-child(2)").click()
    cy.get(".bg-transparent").click()
  })
})