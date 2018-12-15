import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public user: firebase.User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(user => this.user = user);
  }

  public logout(): void {
    this.authService.logout();
  }

}
