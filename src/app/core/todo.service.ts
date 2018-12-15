import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, QueryFn } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITodo } from '../todo/todo';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class TodoService {

  private todos$: AngularFireList<ITodo>

  /**
   * Inject Angularfire Database and hook into the 'todos' path
   * @param afdb
   */
  constructor(private afdb: AngularFireDatabase, private authService: AuthService) {
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

  public getTodo(key: string): Observable<ITodo> {
    return this.afdb.object<ITodo>(`todos/${key}`).snapshotChanges().pipe(
      map(c => ({ $key: c.payload.key, ...c.payload.val() }))
    )
  }

  public saveTodo(todo: ITodo): string {
    return this.todos$.push(todo).key;
  }

  public editTodo(todo: ITodo): Promise<any> {
    let tempTodo = Object.assign({}, todo);
    delete tempTodo.$key;
    return this.todos$.update(todo.$key, tempTodo);
  }

  public deleteTodo(todo): void {
    this.afdb.object(`todos/${todo.$key}`).remove();
  }

}
