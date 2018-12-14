import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { SharedModule } from '../shared/shared.module';
import { TodoEditComponent } from './todo-edit/todo-edit.component';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoEditComponent,
  ],
  exports: [
    TodoListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TodoModule { }
