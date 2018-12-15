import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

/**
 * This is an Angular guard to ensure users don't navigate to certain pages if they are not authenticated
 */
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  /* inject needed services */
  constructor(private authService: AuthService, private router: Router) { }

  /* determine if the user is authenticated */
  canActivate(): Observable<boolean> {
    return this.authService.getUser().pipe(map(user => {
      if (user && user.uid) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }))
  }
}
