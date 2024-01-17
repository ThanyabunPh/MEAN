describe('create test', () => {
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

  it('Adding a new note with title and note des', () => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost')

    cy.get('#input_note2').click()
    cy.get('#input_note1').type('This is a test note')
    cy.get('#input_note2').type('This is a test des note')

    cy.get('div.flex.justify-between').should('be.visible');
    cy.get('button.btn.btn-ghost.border-2').click();

    cy.get('.swal2-popup').should('exist');
    cy.get('#swal2-title').should('have.text', 'Success');
  })

  it('Adding a new todolist and change color of note', () => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost')

    cy.get('#input_note2').click()
    cy.get('#input_note1').type('This is a test note with selected color')
    cy.get('#input_note2').type('This is a test des note  selected color')

    cy.get('div.flex.justify-between').should('be.visible');
    cy.get('form.flex.flex-row.justify-around.ng-untouched.ng-pristine.ng-valid')
      .find('div')
      .eq(1)
      .click()
      .then(() => {
        const rgb_color = hex2rgb('#fca5a5');
        cy.get('[id="input_note1"]').should('have.css', 'background-color', rgb_color);
        cy.get('[id="input_note2"]').should('have.css', 'background-color', rgb_color);
        cy.get('[id="todo_body"]').should('have.css', 'background-color', rgb_color);
      })
    cy.get('button.btn.btn-ghost.border-2').click();

    cy.get('.swal2-popup').should('exist');
    cy.get('#swal2-title').should('have.text', 'Success');

    cy.get('a[style="background-color: rgb(252, 165, 165);"]').should('exist');
  })

  it('Adding a new note with title and note des', () => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost')

    cy.get('#input_note2').click()
    cy.get('#input_note1').type('This is a test note')
    cy.get('#input_note2').type('This is a test des note')

    cy.get('div.flex.justify-between').should('be.visible');
    cy.get('button.btn.btn-ghost.border-2').click();

    cy.get('.swal2-popup').should('exist');
    cy.get('#swal2-title').should('have.text', 'Success');
  })

  it('Adding a new note with title and note des with tag Fast & Important', () => {
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
  })

  it('Adding a new note with title and note des with tag Important', () => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost')
    cy.get('#input_note2').click()
    cy.get('#input_note1').type('This is a test note with  important tag')
    cy.get('#input_note2').type('This is a test des note important tag')
    cy.get('div.flex.justify-between').should('be.visible');
    cy.get('.basis-5\\/6 > .flex-row > .flex').should('be.visible').click()
    cy.get('div form ul li a').eq(1).should('be.visible').click()
    cy.get('#tag_note').should('exist').and('have.text', 'Important ');
    cy.get('form.flex.flex-row.justify-around.ng-untouched.ng-pristine.ng-valid')
      .find('div')
      .eq(2)
      .click()
      .then(() => {
        const rgb_color = hex2rgb('#fdba74');
        cy.get('[id="input_note1"]').should('have.css', 'background-color', rgb_color);
        cy.get('[id="input_note2"]').should('have.css', 'background-color', rgb_color);
        cy.get('[id="todo_body"]').should('have.css', 'background-color', rgb_color);
      })
    cy.get('button.btn.btn-ghost.border-2').click();
    cy.get('.swal2-popup').should('exist');
    cy.get('#swal2-title').should('have.text', 'Success');
    cy.get('.flex-col > :nth-child(1) > :nth-child(1) > .mt-3').should('exist').and('have.text', 'Important');
  })

  it('Adding a new note with title and note des with tag Fast', () => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost')
    cy.get('#input_note2').click()
    cy.get('#input_note1').type('This is a test note with Fast tag')
    cy.get('#input_note2').type('This is a test des note Fast tag')
    cy.get('div.flex.justify-between').should('be.visible');
    cy.get('.basis-5\\/6 > .flex-row > .flex').should('be.visible').click()
    cy.get('div form ul li a').eq(2).should('be.visible').click()
    cy.get('#tag_note').should('exist').and('have.text', 'Fast ');
    cy.get('form.flex.flex-row.justify-around.ng-untouched.ng-pristine.ng-valid')
      .find('div')
      .eq(4)
      .click()
      .then(() => {
        const rgb_color = hex2rgb('#fde047');
        cy.get('[id="input_note1"]').should('have.css', 'background-color', rgb_color);
        cy.get('[id="input_note2"]').should('have.css', 'background-color', rgb_color);
        cy.get('[id="todo_body"]').should('have.css', 'background-color', rgb_color);
      })
    cy.get('button.btn.btn-ghost.border-2').click();
    cy.get('.swal2-popup').should('exist');
    cy.get('#swal2-title').should('have.text', 'Success');
    cy.get('.flex-col > :nth-child(1) > :nth-child(1) > .mt-3').should('exist').and('have.text', 'Fast');
  })

  it('Adding a new note with title and note des with tag Normal', () => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost')
    cy.get('#input_note2').click()
    cy.get('#input_note1').type('This is a test note with Fast tag')
    cy.get('#input_note2').type('This is a test des note Fast tag')
    cy.get('div.flex.justify-between').should('be.visible');
    cy.get('.basis-5\\/6 > .flex-row > .flex').should('be.visible').click()
    cy.get('div form ul li a').eq(3).should('be.visible').click()
    cy.get('#tag_note').should('exist').and('have.text', 'Normal ');
    cy.get('form.flex.flex-row.justify-around.ng-untouched.ng-pristine.ng-valid')
      .find('div')
      .eq(6)
      .click()
      .then(() => {
        const rgb_color = hex2rgb('#7dd3fc');
        cy.get('[id="input_note1"]').should('have.css', 'background-color', rgb_color);
        cy.get('[id="input_note2"]').should('have.css', 'background-color', rgb_color);
        cy.get('[id="todo_body"]').should('have.css', 'background-color', rgb_color);
      })
    cy.get('button.btn.btn-ghost.border-2').click();
    cy.get('.swal2-popup').should('exist');
    cy.get('#swal2-title').should('have.text', 'Success');
    cy.get('.flex-col > :nth-child(1) > :nth-child(1) > .mt-3').should('exist').and('have.text', 'Normal');
  })

})
