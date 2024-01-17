import {Component, Input, OnInit, signal} from '@angular/core';
import {TodosService} from "../../services/todos.service";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-todos-lists-create',
  templateUrl: './todos-lists-create.component.html',
  styleUrl: './todos-lists-create.component.css',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle,
    FormsModule,
    NgIf
  ]
})
export class TodosListsCreateComponent implements OnInit {

  public todo_names = false
  public todo_tag = false
  public panel_control = false

  note_title: any;
  note_des: any;
  selected_type: string | undefined;
  selectedColor: string = '#FFFFFF';

  constructor(private todosService: TodosService) {}
  ngOnInit(): void {
    this.selectColor(this.selectedColor);
  }
  selectColor(color: string) {
    this.selectedColor = color;
    const todo_body = document.getElementById('todo_body');
    const input_note1 = document.getElementById('input_note1');
    const input_note2 = document.getElementById('input_note2');

   if (todo_body && input_note1 && input_note2) {
     todo_body.style.backgroundColor = color;
     input_note1.style.backgroundColor = color;
     input_note2.style.backgroundColor = color;
     input_note1.classList.add('placeholder:text-black');
     input_note2.classList.add('placeholder:text-black');
   }
  }
  showInput(): void {
    this.todo_names = true
    this.todo_tag = true
    this.panel_control = true
  }
  hideInput(): void {
    setTimeout(() => {
      this.todo_names = false
      this.todo_tag = false
      this.panel_control = false
      const todo_body = document.getElementById('todo_body');
      const input_note1 = document.getElementById('input_note1');
      const input_note2 = document.getElementById('input_note2');
      if (todo_body && input_note1 && input_note2) {
        todo_body.style.backgroundColor = '#FFFFFF';
        input_note1.style.backgroundColor = '#FFFFFF';
        input_note2.style.backgroundColor = '#FFFFFF';
        input_note1.classList.remove('placeholder:text-black');
        input_note2.classList.remove('placeholder:text-black');
      }
    }, 10)
    this.postTodo()
  }
  selectItem(item: string): void {
    if (item === 'Fast & Important') {
      this.selected_type = 'Fast_Important'
    } else {
      this.selected_type = item
    }
  }

  postTodo(): void {
    if (this.note_title && this.note_des) {
      this.todosService.createTodo({
        title: this.note_title,
        noted: this.note_des,
        color: this.selectedColor,
        todo_type: this.selected_type
      }).subscribe((res: any) => {
        if (res.message === 'Todo Created') {
          this.show_toast('Success', "Todo has created"  , 'success')
        } else {
          this.show_toast('Error', "Todo has not created"  , 'error')
        }

        setTimeout(() => {
          window.location.reload()
        }, 1500)

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
