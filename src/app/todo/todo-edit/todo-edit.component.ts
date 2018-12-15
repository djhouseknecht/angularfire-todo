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
  /* variables for the active todo, user, and other todo state */
  public todoKey: any;
  public isNewTodo: boolean;
  public todo$: Observable<ITodo>;
  public todo: ITodo;
  public user: firebase.User;

  /* inject needed services */
  constructor(
    private todoService: TodoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    /* get the todo's key from the url */
    this.todoKey = this.activatedRoute.snapshot.paramMap.get('id');

    /* determine if it is a new tod or an existing todo */
    this.isNewTodo = this.todoKey === 'new';

    /* subscribe to get hte current user (this doesn't quite work the way I want) */
    this.authService.getUser().subscribe(user => {
      /* set component user variable */
      this.user = user;

      /* if this is a new todo create a blank todo */
      if (this.isNewTodo) {
        this.todo = {} as ITodo;
        this.todo.userid = this.user.uid;
      /* if this is an existing todo, get it from the database */
      } else {
        this.todoService.getTodo(this.todoKey).subscribe(todo => {
          this.todo = todo;
          this.todo.userid = this.user.uid;
        });
      }

    });
  }

  /**
   * Added a new item to a todo
   */
  public addItem(): void {
    if (!this.todo) return;
    if (!this.todo.content || !this.todo.content.length) this.todo.content = [];
    this.todo.content.push({ checked: false, content: null });
    this.saveTodo(this.todo);
  }

  /**
   * Remove an item from a todo
   * @param index
   */
  public removeItem(index: number): void {
    this.todo.content.splice(index, 1);
    this.saveTodo(this.todo);
  }

  /**
   * Save the todo
   * @param todo
   */
  public saveTodo(todo: ITodo): void {
    /* if it is a new todo, create a new one */
    if (this.isNewTodo) {
      this.todoService.saveTodo(todo);
    /* if it is an existing todo, edit it */
    } else {
      this.todoService.editTodo(todo);
    }
  }

  /**
   * Delete an existing todo
   * @param todo
   */
  public deleteTodo(todo: ITodo): void {
    this.todoService.deleteTodo(todo);
    this.router.navigate(['todo-list']);
  }

  /**
   * Method to call saveToDo and then redirect the user to the todo-list page
   * @param todo
   */
  public save(todo: ITodo): void {
    this.saveTodo(todo);
    this.router.navigate(['todo-list']);
  }
}
