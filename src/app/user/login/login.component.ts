import { Component, OnInit } from '@angular/core';
import { AuthService, ICredentials } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: firebase.User;
  public credentials: ICredentials;
  public newUser: boolean = false;
  public errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  public ngOnInit() {
    this.authService.getUser().subscribe(user => this.user = user);
    this.credentials = {
      email: '',
      password: ''
    };
    this.errorMessage = '';
  }

  public signup() {
    this.authService.signup(this.credentials)
      .then(s => this.success(s))
      .catch(e => this.error(e));
  }

  public login() {
    this.authService.login(this.credentials)
      .then(s => this.success(s))
      .catch(e => this.error(e));
  }

  public logout() {
    this.authService.logout();
  }

  public toggleNewUser(): void {
    this.newUser = !this.newUser;
  }

  private success(r): void {
    console.log('Successful!', r);
    this.credentials.email = this.credentials.password = '';
    this.router.navigate(['todo-list']);
  }

  private error(e): void {
    console.log('Error creating user', e);
    this.credentials.email = this.credentials.password = '';
    this.errorMessage = e.message;
  }

}
