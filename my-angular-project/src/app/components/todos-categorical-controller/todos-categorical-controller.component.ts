import {Component, Input} from '@angular/core';
import {TodosService} from '../../services/todos.service';
import {TodosModel} from "../../models/todos.model";
import {NgClass, NgStyle} from "@angular/common";

@Component({
  selector: 'app-todos-categorical-controller',
  templateUrl: './todos-categorical-controller.component.html',
  styleUrl: './todos-categorical-controller.component.css',
  standalone: true,
  imports: [
    NgStyle,
    NgClass
  ]
})
export class TodosCategoricalControllerComponent {
  @Input() filterTodos!: (type: string) => void;
  @Input() selected_type!: string;


  filterTodosByType(query_type: string): void {
    this.filterTodos(query_type);
  }

}
