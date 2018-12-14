import { Component, OnInit } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { Observable, of } from 'rxjs';
import { ITodo } from '../todo';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {
  public todoKey: any;
  public isNewTodo: boolean;
  public todo$: Observable<ITodo>;
  public todo: ITodo;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.todoKey = this.activatedRoute.snapshot.paramMap.get('id');

    this.isNewTodo = this.todoKey === 'new';

    if (this.isNewTodo) {
      // this.todo$ = of({}) as Observable<ITodo>;
      this.todo = {} as ITodo;
    } else {
      this.todoService.getTodo(this.todoKey).subscribe(todo => this.todo = todo);
      // this.todo$ = this.todoService.getTodo(this.todoKey);
    }
  }

  public addItem(): void {
    if (!this.todo) return;
    if (!this.todo.content || !this.todo.content.length) this.todo.content = [];
    this.todo.content.push({checked: false, content: null});
    this.saveTodo(this.todo);
  }

  public removeItem(index: number): void {
    this.todo.content.splice(index, 1);
    this.saveTodo(this.todo);
  }

  public saveTodo(todo: ITodo): void {
    if (this.isNewTodo) {
      this.todoService.saveTodo(todo);
    } else {
      this.todoService.editTodo(todo);
    }
  }

  public deleteTodo(todo: ITodo): void {
    this.todoService.deleteTodo(todo);
    this.router.navigate(['todo-list']);
  }

  public save(todo: ITodo): void {
    this.saveTodo(todo);
    this.router.navigate(['todo-list']);
  }
}
