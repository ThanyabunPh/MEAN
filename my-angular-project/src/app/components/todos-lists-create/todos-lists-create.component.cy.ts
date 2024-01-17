import { ComponentFixture } from '@angular/core/testing';
import {TodosListsCreateComponent} from './todos-lists-create.component'
import {TodosService} from "../../services/todos.service";

describe('TodosListsCreateComponent', () => {

  const hex2rgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgb(`+ r + `, ` + g + `, ` + b + `)`;
  }

  let todosServiceMock;

  beforeEach(() => {
    cy.viewport(800, 500)
    // Mock TodosService
    todosServiceMock = {
      createTodo: cy.stub().as('createTodo')
    };

    // Mount the component with the mocked service
    cy.mount(TodosListsCreateComponent, {
      providers: [
        { provide: TodosService, useValue: todosServiceMock }
      ]
    }).then((wrapper) => {
      cy.spy(wrapper.component, 'selectColor').as('selectColor');
      cy.spy(wrapper.component, 'showInput').as('showInput');
      cy.spy(wrapper.component, 'hideInput').as('hideInput');
    });
  });

  it('Should have Title input When click the note input', () => {
    cy.get('[id="input_note2"]').click();
    cy.get('[id="input_note1"]').should('be.visible');
  });

  it ('Should have Title input When click the note input', () => {
    cy.get('[id="input_note2"]').click();
    cy.get('div.flex.justify-between').should('be.visible');
  })

  it('Should have both Title and config panel When click the note input', () => {
    cy.get('[id="input_note2"]').click();
    cy.get('[id="input_note1"]').should('be.visible');
    cy.get('[id="input_note2"]').should('be.visible');
    cy.get('div.flex.justify-between').should('be.visible');
  })

  it('Should have the color changing panel', () => {
    cy.get('[id="input_note2"]').click();
    cy.get('form.flex.flex-row.justify-around.ng-untouched.ng-pristine.ng-valid').should('be.visible');
  })

  it('should allow each color to be selected', () => {
    const colors = ['#FFFFFF', '#fca5a5', '#fdba74', '#fcd34d', '#fde047', '#bef264', '#7dd3fc', '#d8b4fe', '#cbd5e1'];

    cy.get('[id="input_note2"]').click();
    colors.forEach((color, index) => {
      cy.get('form.flex.flex-row.justify-around.ng-untouched.ng-pristine.ng-valid')
        .find('div')
        .eq(index)
        .click()
        .then(() => {
          const rgb_color = hex2rgb(color)
          cy.get('[id="input_note1"]').should('have.css', 'background-color', rgb_color);
          cy.get('[id="input_note2"]').should('have.css', 'background-color', rgb_color);
          cy.get('[id="todo_body"]').should('have.css', 'background-color', rgb_color);
        })
      });
    })

  it('Should can open and close the input panel', () => {
    cy.get('[id="input_note2"]').click();

    cy.get('[id="input_note1"]').should('be.visible');
    cy.get('[id="input_note2"]').should('be.visible');
    cy.get('div.flex.justify-between').should('be.visible');

    cy.get('button.btn.btn-ghost.border-2').click();

    cy.get('[id="input_note1"]').should('not.exist');
    cy.get('div.flex.justify-between').should('not.exist');
  })

});
