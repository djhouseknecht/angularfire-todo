import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'todo-list', component: TodoListComponent, canActivate: [AuthGuard] },
  { path: 'todo-edit/:id', component: TodoEditComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
