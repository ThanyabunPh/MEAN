describe('read test', () => {

  it('Visits the initial project page', () => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost')
    cy.contains('K e e p It')
  })

  it('Should render every tag and no tag when click home', () => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost')
    cy.get('.menu > :nth-child(1) > .flex').click()

    cy.get('.flex-col').children().then((children) => {
      for (let i = 0; i < children.length - 1; i++) {
        cy.get('.flex-col').children().eq(i).find('p').should('exist');
      }
    })
  })

  it('Should render Fast and Important tag when click Fast & Important', () => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost')
    cy.get('.menu > :nth-child(2) > .flex').click()

    cy.get('.flex-col').children().then((children) => {
      for (let i = 0; i < children.length - 1; i++) {
        cy.get('.flex-col').children().eq(i).find('.mt-3.badge.badge-outline').contains('Fast & Important')
      }
    })
  })

  it('Should render Important tag when click Important', () => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost')
    cy.get('.tflex').click()

    cy.get('.flex-col').children().then((children) => {
      for (let i = 0; i < children.length - 1; i++) {
        cy.get('.flex-col').children().eq(i).find('.mt-3.badge.badge-outline').contains('Important')
      }
    })
  })

  it('Should render Fast tag when click Fast', () => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost')
    cy.get('.menu > :nth-child(4) > .flex').click()

    cy.get('.flex-col').children().then((children) => {
      for (let i = 0; i < children.length - 1; i++) {
        cy.get('.flex-col').children().eq(i).find('.mt-3.badge.badge-outline').contains('Fast')
      }
    })

  })

  it('Should render Normal tag when click Normal', () => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost')
    cy.get('.menu > :nth-child(5) > .flex').click()

    cy.get('.flex-col').children().then((children) => {
      for (let i = 0; i < children.length - 1; i++) {
        cy.get('.flex-col').children().eq(i).find('.mt-3.badge.badge-outline').contains('Normal')
      }
    })
  })
})
