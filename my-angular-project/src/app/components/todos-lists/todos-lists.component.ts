import {Component, Input, signal} from '@angular/core';
import {TodosService} from '../../services/todos.service';
import {TodosModel} from "../../models/todos.model";
import {TodosListsCreateComponent} from "../todos-lists-create/todos-lists-create.component";
import {AsyncPipe, DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-todos-lists',
  styleUrl: './todos-lists.component.css',
  standalone: true,
  providers: [TodosService],
  imports: [
    TodosListsCreateComponent,
    AsyncPipe,
    NgForOf,
    NgIf,
    NgStyle,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './todos-lists.component.html',
})
export class TodosListsComponent {

  title = '';

  selectedType: string | undefined;
  note_id: string | undefined;
  note_title: string | undefined;
  note_des: string | undefined;
  selectedColor: string | undefined;
  todo_type: string | undefined;

  original_todo: any;

  @Input() todoLists!: TodosModel[] | undefined;

  constructor(private todosService: TodosService) {
  }
  edit(todoItem: any): void {
    this.original_todo = todoItem;
    this.note_id = todoItem._id;
    this.note_title = todoItem.title;
    this.note_des = todoItem.noted;
    this.selectedColor = todoItem.color;
    this.selectedType = todoItem.todo_type;
    // Now open the modal
    const modal = document.getElementById('my_edit_modal') as HTMLDialogElement;
    const modal_blocker = document.getElementById('my_edit_modal_block') as HTMLDivElement;
    if (typeof this.selectedColor === "string") {
      modal_blocker.style.backgroundColor = this.selectedColor;
      let title_input = document.getElementById('note_title') as HTMLInputElement;
      let noted_input = document.getElementById('note_des') as HTMLInputElement;
      title_input.style.backgroundColor = this.selectedColor;
      noted_input.style.backgroundColor = this.selectedColor;
    }
    modal.showModal();
  }


  closeModal(): void {
    const modal = document.getElementById('my_edit_modal') as HTMLDialogElement;
    modal.close();
    let update_todo = {
      title: this.note_title,
      noted: this.note_des,
      color: this.selectedColor,
      todo_type: this.selectedType,
    }

    if (this.original_todo) {
      if (this.original_todo.title === this.note_title && this.original_todo.noted === this.note_des && this.original_todo.color === this.selectedColor && this.original_todo.todo_type === this.selectedType) {
        return;
      }
    }

    if (this.note_id) {
      this.todosService.updateTodoById(this.note_id, update_todo).subscribe((data: any) => {
        if (data.message === 'Todo updated') {
          this.show_toast('Success', "Todo has updated"  , 'success')
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          this.show_toast('Error', "Todo has not updated"  , 'error')
        }
      })
    }
  }

  selectColor(color: string): void {
    this.selectedColor = color;
    const modal_blocker = document.getElementById('my_edit_modal_block') as HTMLDivElement;
    let title_input = document.getElementById('note_title') as HTMLInputElement;
    let noted_input = document.getElementById('note_des') as HTMLInputElement;

    modal_blocker.style.backgroundColor = this.selectedColor;
    title_input.style.backgroundColor = this.selectedColor;
    noted_input.style.backgroundColor = this.selectedColor;
  }

  selectItem(item: string): void {
    this.selectedType = item;
  }


  deleteTodoById(): void {
    this.closeModal()
    if (this.note_id) {
      this.todosService.deleteTodoById(this.note_id).subscribe((data: any) => {
        if (data.message === 'Todo deleted successfully') {
          this.show_toast('Success', "Todo has deleted"  , 'success')
          setTimeout(() => {

            window.location.reload();
          }, 1500);
        } else {
          this.show_toast('Error', "Todo has not deleted"  , 'error');
        }
      })
    }
  }

  show_toast(
    title: string,
    text: string,
    icon: any,
  ) {
    Swal.fire({
      title: title,
      icon: icon,
      text: text,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    }).then();
  }


}
