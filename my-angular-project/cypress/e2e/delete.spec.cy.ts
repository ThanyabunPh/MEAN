describe('delete test', () => {
  it('Visits the initial project page', () => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost')
    cy.contains('K e e p It')
  })


  it('Should Delete a note if note exits', () => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost')

    cy.get('#input_note2').click()
    cy.get('#input_note1').type('This is a test note')
    cy.get('#input_note2').type('This is a test des note')

    cy.get('div.flex.justify-between').should('be.visible');
    cy.get('button.btn.btn-ghost.border-2').click();

    cy.get('.swal2-popup').should('exist');
    cy.get('#swal2-title').should('have.text', 'Success');

    cy.wait(2500);
    cy.get('.flex-col > :nth-child(1)').click()
    cy.get('#my_edit_modal').should('be.visible');
    cy.get('[id="delete-todo"]').click();

    cy.get('.swal2-popup').should('exist');
    cy.get('#swal2-title').should('have.text', 'Success');
  })

})
