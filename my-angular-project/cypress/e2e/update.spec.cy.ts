describe('update test', () => {

  const hex2rgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgb(`+ r + `, ` + g + `, ` + b + `)`;
  }

  it('Visits the initial project page', () => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost')
    cy.contains('K e e p It')
  })

  it ('Should update a note if note exits', () => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost')

    cy.get('#input_note2').click()
    cy.get('#input_note1').type('This is a test note')
    cy.get('#input_note2').type('This is a test des note')

    cy.get('div.flex.justify-between').should('be.visible');
    cy.get('button.btn.btn-ghost.border-2').click();

    cy.wait(2500);

    cy.get('.flex-col').children().first().click()
    cy.get('#my_edit_modal').should('be.visible');
    cy.get('#note_title').clear().type('This is a test note that has edited title');
    cy.get('#note_des').clear().type('This is a test note that has edited des');
    cy.get('.basis-1\\/12 > .btn').click();

    cy.get('.swal2-popup').should('exist');
    cy.get('#swal2-title').should('have.text', 'Success');

  })

  it('Should edit color of note', () => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost')

    cy.get('#input_note2').click()
    cy.get('#input_note1').type('This is a test note')
    cy.get('#input_note2').type('This is a test des note')

    cy.get('div.flex.justify-between').should('be.visible');
    cy.get('button.btn.btn-ghost.border-2').click();

    cy.wait(2500);

    cy.get('.flex-col').children().first().click()
    cy.get('#my_edit_modal').should('be.visible');
    cy.get('#edit_control')
      .find('div')
      .eq(5)
      .click()
      .then(() => {
        const rgb_color = hex2rgb('#bef264');
        cy.get('[id="note_title"]').should('have.css', 'background-color', rgb_color);
        cy.get('[id="note_des"]').should('have.css', 'background-color', rgb_color);
        cy.get('[id="my_edit_modal_block"]').should('have.css', 'background-color', rgb_color);
      })
    // cy.get('#selected_btn').click().find('ul').find('li').eq(1).click()
    cy.get('.basis-1\\/12 > .btn').click();

    cy.get('.swal2-popup').should('exist');
    cy.get('#swal2-title').should('have.text', 'Success');
    cy.wait(2500);

    cy.get('.flex-col').children().first().should('have.css', 'background-color', 'rgb(190, 242, 100)');

  })

  it('Should edit type of note', () => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost')

    cy.get('#input_note2').click()
    cy.get('#input_note1').type('This is a test note with Fast & Important tag')
    cy.get('#input_note2').type('This is a test des note Fast & Important tag')
    cy.get('div.flex.justify-between').should('be.visible');
    cy.get('.basis-5\\/6 > .flex-row > .flex').should('be.visible').click()
    cy.get('div form ul li a').eq(0).should('be.visible').click()
    cy.get('#tag_note').should('exist').and('have.text', 'Fast & Important ');
    cy.get('button.btn.btn-ghost.border-2').click();
    cy.get('.swal2-popup').should('exist');
    cy.get('#swal2-title').should('have.text', 'Success');
    cy.get('.flex-col > :nth-child(1) > :nth-child(1) > .mt-3').should('exist').and('have.text', 'Fast & Important');

    cy.wait(2500);
    cy.get('.flex-col').children().first().click()
    cy.get('#my_edit_modal').should('be.visible');
    cy.get('#edit_control')
      .find('div')
      .eq(6)
      .click()
      .then(() => {
        cy.get('#selected_btn').click().find('ul').find('li').eq(1).click()
      })
    cy.get('.basis-1\\/12 > .btn').click();

    cy.get('.swal2-popup').should('exist');
    cy.get('#swal2-title').should('have.text', 'Success');
    cy.wait(2500);

    cy.get('.flex-col').children().first().should('have.css', 'background-color', hex2rgb('#7dd3fc'))
    cy.get('.flex-col > :nth-child(1) > :nth-child(1) > .mt-3').should('exist').and('have.text', 'Important')
  })
})
