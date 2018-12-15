import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

export interface ICredentials {
  email: string,
  password: string
}

@Injectable({providedIn: 'root'})
export class AuthService {

  private user$: Observable<firebase.User>

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

  public getUser(): Observable<firebase.User> {
    return this.user$;
  }

  public signup(creds: ICredentials): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(creds.email, creds.password);
  }

  public login(creds: ICredentials): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(creds.email, creds.password);
  }

  public logout(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/home']);
  }
}
