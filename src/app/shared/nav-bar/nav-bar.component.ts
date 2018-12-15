import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  /* variable to user */
  public user: firebase.User;

  /* inject needed services */
  constructor(private authService: AuthService) { }

  /* get the current user */
  ngOnInit() {
    this.authService.getUser().subscribe(user => this.user = user);
  }

  /**
   * Function to logout the current user
   */
  public logout(): void {
    this.authService.logout();
  }

}
