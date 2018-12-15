import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from '../../core/todo.service';
import { ITodo } from '../todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  /* variables for list of todos and other todo states */
  public todoKey: string;
  public todos$: Observable<ITodo[]>;

  /* inject needed services */
  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit() {
    /* get all todos from backend */
    this.todos$ = this.todoService.getTodos();
  }

  /**
   * Get a single todo by key
   */
  public getTodo(): void {
    this.todoService.getTodo(this.todoKey);
  }

  /**
   * Navigate to the edit page for a given todo
   * @param todo
   */
  public editTodo(todo: ITodo): void {
    this.router.navigate(['todo-edit', todo.$key]);
  }

}
