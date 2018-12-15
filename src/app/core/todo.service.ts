import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, QueryFn } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITodo } from '../todo/todo';
import { AuthService } from './auth.service';

/**
 * Service to manage all ToDo actions
 */
@Injectable({providedIn: 'root'})
export class TodoService {

  /* variable to database */
  private todos$: AngularFireList<ITodo>

  /* Inject Angularfire Database and hook into the 'todos' path */
  constructor(private afdb: AngularFireDatabase, private authService: AuthService) {
    /* this query doesn't work like I hoped. */
    /* TODO: fix this */
    this.authService.getUser().subscribe(user => {
      this.todos$ = this.afdb.list<ITodo>(`todos`, ref => {
        return ref.orderByChild('userid').equalTo(user.uid)
      });
    });
  }

  /**
   * Return a list of all todos
   */
  public getTodos(): Observable<ITodo[]> {
    return this.todos$.snapshotChanges().pipe(
      map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() })
    )));
  }

  /**
   * Get a single todo by key
   * @param key
   */
  public getTodo(key: string): Observable<ITodo> {
    return this.afdb.object<ITodo>(`todos/${key}`).snapshotChanges().pipe(
      map(c => ({ $key: c.payload.key, ...c.payload.val() }))
    )
  }

  /**
   * Save a new todo
   * @param todo
   */
  public saveTodo(todo: ITodo): string {
    return this.todos$.push(todo).key;
  }

  /**
   * Edit an existing todo
   * @param todo
   */
  public editTodo(todo: ITodo): Promise<any> {
    let tempTodo = Object.assign({}, todo);
    delete tempTodo.$key;
    return this.todos$.update(todo.$key, tempTodo);
  }

  /**
   * Delete an existing todo
   * @param todo
   */
  public deleteTodo(todo): void {
    this.afdb.object(`todos/${todo.$key}`).remove();
  }

}
