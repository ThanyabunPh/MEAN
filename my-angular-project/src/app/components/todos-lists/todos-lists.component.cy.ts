import { TodosListsComponent } from './todos-lists.component'
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TodosService} from "../../services/todos.service";

describe('TodosListsComponent', () => {

  const mockTodosData = [
    {
      "_id": "65a6d862a91a40b6031f8682",
      "title": "test not tag",
      "noted": "test not tag",
      "color": "#FFFFFF",
      "timestamp": "2024-01-16T19:26:26.671Z",
      "__v": 0
    },
    {
      "_id": "65a5860470721fe8b0f80578",
      "title": "Normal # Normal",
      "noted": "Normal # NormalNormal # Normal",
      "color": "#bef264",
      "todo_type": "Normal",
      "timestamp": "2024-01-15T19:22:44.880Z",
      "__v": 0
    },
    {
      "_id": "65a580e04c9b72c81ae9e615",
      "title": "important #2",
      "noted": "important des #2",
      "color": "#cbd5e1",
      "todo_type": "Important",
      "timestamp": "2024-01-15T19:00:48.677Z",
      "__v": 0
    },
    {
      "_id": "65a580634c9b72c81ae9e602",
      "title": "fast",
      "noted": "fast_desk",
      "color": "#fde047",
      "todo_type": "Fast",
      "timestamp": "2024-01-15T18:58:43.869Z",
      "__v": 0
    },
    {
      "_id": "65a5801b4c9b72c81ae9e5fe",
      "title": "important",
      "noted": "important desk",
      "color": "#fca5a5",
      "todo_type": "Fast_Important",
      "timestamp": "2024-01-15T18:57:31.236Z",
      "__v": 0
    },
    {
      "_id": "65a57efc4c9b72c81ae9e5dd",
      "title": "fast_important",
      "noted": "fast",
      "color": "#FFFFFF",
      "todo_type": "Fast_Important",
      "timestamp": "2024-01-15T18:52:44.798Z",
      "__v": 0
    }
  ]

  const hex2rgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgb(`+ r + `, ` + g + `, ` + b + `)`;
  }


  it('should mount', () => {
    cy.mount(TodosListsComponent, {
      imports: [HttpClientTestingModule],
      providers: [TodosService]
    })
  })

  it('should render input new todo', () => {
    cy.mount(TodosListsComponent, {
      imports: [HttpClientTestingModule],
      providers: [TodosService]
    })
    cy.get('#input_note2').should('exist');
  })

  it('should render loading infinity if data isn\'t exit ', () => {
    cy.mount(TodosListsComponent, {
      imports: [HttpClientTestingModule],
      providers: [TodosService]
    })
    cy.get('span.loading.loading-infinity.loading-lg').should('exist');
  })

  it('should not render loading infinity if data exit ', () => {
    cy.viewport(1080, 720);

    cy.mount(TodosListsComponent, {
      imports: [HttpClientTestingModule],
      componentProperties: { todoLists: mockTodosData },
    });

    cy.get('span.loading.loading-infinity.loading-lg').should('not.exist');
  })

  it('should render the correct number of todo items', () => {
    cy.mount(TodosListsComponent, {
      imports: [HttpClientTestingModule],
      componentProperties: { todoLists: mockTodosData },
    });
    cy.get('.flex-col').find('a').find('p').should('have.length', mockTodosData.length * 3);
  })

  it('should open modal when click edit button', () => {
    cy.viewport(1080, 720);

    cy.mount(TodosListsComponent, {
      imports: [HttpClientTestingModule],
      componentProperties: { todoLists: mockTodosData },
    });

    cy.get('.flex-col').find('a').find('p').first().click();
    cy.get('#my_edit_modal').should('be.visible');
  })

  it('should close modal when click close button', () => {
    cy.viewport(1080, 720);

    cy.mount(TodosListsComponent, {
      imports: [HttpClientTestingModule],
      componentProperties: { todoLists: mockTodosData },
    });

    cy.get('.flex-col').find('a').find('p').first().click();
    cy.get('#my_edit_modal').should('be.visible');
    cy.get('.btn').click();
    cy.get('#my_edit_modal').should('not.be.visible');
  })

  it('Modal should render color same as todo item', () => {
    cy.viewport(1080, 720);

    cy.mount(TodosListsComponent, {
      imports: [HttpClientTestingModule],
      componentProperties: { todoLists: mockTodosData },
    });

    cy.get('.flex-col').find('a').find('p').first().click();
    cy.get('#my_edit_modal').should('be.visible');
    cy.get('#my_edit_modal_block').should('have.css', 'background-color', hex2rgb(mockTodosData[0].color));

  })

  it('Modal should render title same as todo item', () => {
    cy.viewport(1080, 720);

    cy.mount(TodosListsComponent, {
      imports: [HttpClientTestingModule],
      componentProperties: { todoLists: mockTodosData },
    });

    cy.get('.flex-col').find('a').find('p').first().click();
    cy.get('#my_edit_modal').should('be.visible');
    cy.get('#note_title').should('have.value', mockTodosData[0].title);

  })

  it('Modal should render noted same as todo item', () => {
    cy.viewport(1080, 720);

    cy.mount(TodosListsComponent, {
      imports: [HttpClientTestingModule],
      componentProperties: { todoLists: mockTodosData },
    });

    cy.get('.flex-col').find('a').find('p').first().click();
    cy.get('#my_edit_modal').should('be.visible');
    cy.get('#note_des').should('have.value', mockTodosData[0].noted);

  })

  it('Modal should not render tag if note has no tag', () => {
    cy.viewport(1080, 720);

    cy.mount(TodosListsComponent, {
      imports: [HttpClientTestingModule],
      componentProperties: { todoLists: mockTodosData },
    });

    cy.get('.flex-col').find('a').find('p').first().click();
    cy.get('#my_edit_modal').should('be.visible');
    cy.get('#note_tag').should('not.exist');
  })

  it('Modal should render tag if note has tag', () => {
    cy.viewport(1080, 720);

    cy.mount(TodosListsComponent, {
      imports: [HttpClientTestingModule],
      componentProperties: { todoLists: mockTodosData },
    });

    cy.get('.flex-col').find('a').find('p')
      .last().click();
    cy.get('#my_edit_modal').should('be.visible');
    cy.get('[id=tag_note]').should('exist');
  })

  it('Modal should render tag same as todo item', () => {
    cy.viewport(1080, 720);

    cy.mount(TodosListsComponent, {
      imports: [HttpClientTestingModule],
      componentProperties: { todoLists: mockTodosData },
    });

    cy.get('.flex-col').find('a').find('p')
      .last().click();
    cy.get('#my_edit_modal').should('be.visible');
    cy.get('[id=tag_note]').should('have.text', mockTodosData[5].todo_type);
  })

  it ('should edit title from the modal', () => {
    cy.viewport(1080, 720);

    cy.mount(TodosListsComponent, {
      imports: [HttpClientTestingModule],
      componentProperties: { todoLists: mockTodosData },
    });

    cy.get('.flex-col').find('a').find('p')
      .first().click();
    cy.get('#my_edit_modal').should('be.visible');
    cy.get('#note_title').clear().type('edit title');
    cy.get('#note_des').clear().type('edit des');

    cy.get('.btn').click();
  })

  it ('should delete todo item', () => {
    cy.viewport(1080, 720);

    cy.mount(TodosListsComponent, {
      imports: [HttpClientTestingModule],
      componentProperties: { todoLists: mockTodosData },
    });

    cy.get('.flex-col').find('a').find('p')
      .first().click();
    cy.get('#my_edit_modal').should('be.visible');
    cy.get('[id="delete-todo"]').click();

  })

  it ('should select type of todo item', () => {
    cy.viewport(1080, 720);

    cy.mount(TodosListsComponent, {
      imports: [HttpClientTestingModule],
      componentProperties: { todoLists: mockTodosData },
    });

    cy.get('.flex-col').find('a').find('p')
      .first().click();
    cy.get('#my_edit_modal').should('be.visible');

    cy.get('#selected_btn').click();
    cy.get('ul').find('li')
      .first().click();
    cy.get('[id=tag_note]').should('have.text', 'Fast_Important');

    cy.get('#selected_btn').click();
    cy.get('ul').find('li')
      .last().click();
    cy.get('[id=tag_note]').should('have.text', 'Normal');

  })

  it ('should select color of todo item', () => {

    cy.viewport(1600, 900);

    const colors = ['#FFFFFF', '#fca5a5', '#fdba74', '#fcd34d', '#fde047', '#bef264', '#7dd3fc', '#d8b4fe', '#cbd5e1'];
    cy.mount(TodosListsComponent, {
      imports: [HttpClientTestingModule],
      componentProperties: { todoLists: mockTodosData },
    });

    cy.get('.flex-col').find('a').find('p')
      .first().click();
    cy.get('#my_edit_modal').should('be.visible');
    colors.forEach((color, index) => {
      cy.get('#edit_control')
        .find('form')
        .find('div')
        .eq(index)
        .click()
        .then(() => {
          setTimeout(() => {
            const rgb_color = hex2rgb(color)
            cy.get('[id="my_edit_modal_block"]').should('have.css', 'background-color', rgb_color);
            cy.get('[id="note_title"]').should('have.css', 'background-color', rgb_color);
            cy.get('[id="note_des"]').should('have.css', 'background-color', rgb_color);
          }, 1000)
        })
    });

  })
})
