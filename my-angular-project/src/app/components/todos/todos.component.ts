import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { TodosListsComponent } from "../todos-lists/todos-lists.component";
import { TodosCategoricalControllerComponent } from "../todos-categorical-controller/todos-categorical-controller.component";
import { TodosModel } from "../../models/todos.model";
import { TodosService } from "../../services/todos.service";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  standalone: true,
  styleUrl: './todos.component.css',
  imports: [
    NavbarComponent,
    TodosListsComponent,
    TodosCategoricalControllerComponent,
  ],
})
export class TodosComponent {

  todosLists?: TodosModel[];
  selected_type: string = 'all';

  constructor(private todosService: TodosService) {
    this.filterTodos = this.filterTodos.bind(this);
    this.retrieveTodos();
  }


  public retrieveTodos(): void {
    this.todosService.getTodos()
      .subscribe(data => {
        this.todosLists = this.extractTodosArray(data)
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      });
    console.log(this.todosLists)
  }

  filterTodos = (query_type: string): void => {
    if (query_type === 'all') {
      this.retrieveTodos();
      this.selected_type = query_type;
    } else {
      this.todosService.getTodosByType(query_type)
        .subscribe(data => {
          this.todosLists = this.extractTodosArray(data)
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        });
      console.log(this.todosLists)
      this.selected_type = query_type
    }
  };

  extractTodosArray(data: any): any[] {
    if (data && Array.isArray(data.todos)) {
      return data.todos;
    } else {
      return [];
    }
  }

}
