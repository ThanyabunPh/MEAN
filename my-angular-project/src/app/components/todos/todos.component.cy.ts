import {TodosComponent} from "./todos.component";
import {TodosService} from "../../services/todos.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {of} from "rxjs";

describe('TodosComponent', () => {

  it('should create', () => {
    cy.mount(TodosComponent, {
      imports: [HttpClientTestingModule],
      providers: [TodosService]
    });
  });

  it("should render loading infinity if data isn't exit", () => {
    cy.viewport(1000, 660);
    cy.mount(TodosComponent, {
      imports: [HttpClientTestingModule],
      providers: [TodosService]
    })
    cy.get('span.loading.loading-infinity.loading-lg').should('exist');
  });

  it("should not render loading infinity if data exit", () => {
    cy.viewport(1000, 660);
    const mockTodosData = [
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

    const todosServiceMock = {
      getTodos: cy.stub().as('getTodos').returns(of(mockTodosData)),
      getTodosByType: cy.stub().as('getTodosByType').returns(of(mockTodosData))
    };

    cy.mount(TodosComponent, {
      imports: [HttpClientTestingModule],
      providers: [
        { provide: TodosService, useValue: todosServiceMock }
      ]
    });

    cy.get('@getTodos').should('have.been.calledOnce');
    cy.get('@getTodosByType').should('not.have.been.called');
    cy.get('span.loading.loading-infinity.loading-lg').should('not.be.exist');

  });
});
