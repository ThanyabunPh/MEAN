import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodosModel } from '../models/todos.model';

const API_URI = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})

export class TodosService {
  constructor(private http: HttpClient) { }

  getTodos(): Observable<TodosModel[]> {
    return this.http.get<any>(`${API_URI}/todo`);
  }

  getTodosByType(todo_type: string): Observable<TodosModel[]> {
    return this.http.get<any>(`${API_URI}/todo/${todo_type}`);
  }

  createTodo(data: any): Observable<TodosModel> {
    return this.http.post<TodosModel>(`${API_URI}/todo`, data);
  }

  updateTodoById(_id: string, data: any): Observable<TodosModel> {
    return this.http.put<TodosModel>(`${API_URI}/todo`, { todoID: _id, ...data });
  }

  deleteTodoById(_id: string): Observable<TodosModel> {
    return this.http.delete<TodosModel>(`${API_URI}/todo`, { body: { todoID: _id } });
  }

}
