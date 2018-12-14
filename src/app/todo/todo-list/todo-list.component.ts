import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from '../service/todo.service';
import { ITodo } from '../todo';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public todoKey: string;
  public todos$: Observable<ITodo[]>;
  public isNewTodo: boolean;

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit() {
    this.todos$ = this.todoService.getTodos();
  }

  public getTodo(): void {
    this.todoService.getTodo(this.todoKey);
  }

  public editTodo(todo: ITodo): void {
    this.router.navigate(['todo-edit', todo.$key]);
  }

}
