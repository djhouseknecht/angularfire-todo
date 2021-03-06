import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

/* interface for user's credentials */
export interface ICredentials {
  email: string,
  password: string
}

/**
 * Service to handle all authorization state
 */
@Injectable({providedIn: 'root'})
export class AuthService {

  /* variable to User reference */
  private user$: Observable<firebase.User>

  /* inject needed services */
  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

  /**
   * Get the current user
   */
  public getUser(): Observable<firebase.User> {
    return this.user$;
  }

  /**
   * Sign up a new user
   * @param creds
   */
  public signup(creds: ICredentials): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(creds.email, creds.password);
  }

  /**
   * Login an existing user
   * @param creds
   */
  public login(creds: ICredentials): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(creds.email, creds.password);
  }

  /**
   * Logout a logged in user
   */
  public logout(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/home']);
  }
}
