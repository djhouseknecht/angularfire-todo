import { Component, OnInit } from '@angular/core';
import { AuthService, ICredentials } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /* variables for user, credentials, and other state */
  public user: firebase.User;
  public credentials: ICredentials;
  public newUser: boolean = false;
  public errorMessage: string;

  /* inject needed services */
  constructor(private authService: AuthService, private router: Router) { }

  public ngOnInit() {
    /* get the current user */
    this.authService.getUser().subscribe(user => this.user = user);
    /* set credentials and errorMesage to empty strings */
    this.credentials = {
      email: '',
      password: ''
    };
    this.errorMessage = '';
  }

  /**
   * Sign the user up
   */
  public signup() {
    this.authService.signup(this.credentials)
      .then(s => this.success(s))
      .catch(e => this.error(e));
  }

  /**
   * Log a user in
   */
  public login() {
    this.authService.login(this.credentials)
      .then(s => this.success(s))
      .catch(e => this.error(e));
  }

  /**
   * Log the user out
   */
  public logout() {
    this.authService.logout();
  }

  /**
   * Toggle between a new user or existing user
   */
  public toggleNewUser(): void {
    this.newUser = !this.newUser;
  }

  /**
   * Call this on successful loggin attempts
   * @param r
   */
  private success(r): void {
    console.log('Successful!', r);
    this.credentials.email = this.credentials.password = '';
    this.router.navigate(['todo-list']);
  }

  /**
   * Call this on errors for loggin attempts
   * @param e
   */
  private error(e): void {
    console.log('Error creating user', e);
    this.credentials.email = this.credentials.password = '';
    this.errorMessage = e.message;
  }

}
