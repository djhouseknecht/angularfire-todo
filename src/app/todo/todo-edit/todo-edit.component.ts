import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../core/todo.service';
import { Observable } from 'rxjs';
import { ITodo } from '../todo';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';

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
  public user: firebase.User;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.todoKey = this.activatedRoute.snapshot.paramMap.get('id');

    this.isNewTodo = this.todoKey === 'new';

    this.authService.getUser().subscribe(user => {
      this.user = user;
      if (this.isNewTodo) {
        this.todo = {} as ITodo;
        this.todo.userid = this.user.uid;
      } else {
        this.todoService.getTodo(this.todoKey).subscribe(todo => {
          this.todo = todo;
          this.todo.userid = this.user.uid;
        });
      }

    });
  }

  public addItem(): void {
    if (!this.todo) return;
    if (!this.todo.content || !this.todo.content.length) this.todo.content = [];
    this.todo.content.push({ checked: false, content: null });
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
