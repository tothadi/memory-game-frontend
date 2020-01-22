import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { AuthenticationService } from './authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Memóriajáték';
  showProfile: boolean;
  cookieAccepted = false;
  token: string;

  acceptCookies() {
    this.cookieAccepted = true;
    this.saveToken();
  }

  private saveToken() {
    localStorage.setItem('cookie-token', 'accepted');
  }

  private getToken() {
    this.token = localStorage.getItem('cookie-token');
    if (this.token === 'accepted')
      this.cookieAccepted = true;
  }


  constructor(public auth: AuthenticationService, private location: Location, private router: Router) {
    
  }

  ngOnInit(): void {
    this.getToken();
    this.router.events.subscribe(event => {
      if (this.location.path() === '/setup' || this.location.path() === '/profile') {
        this.showProfile = true;
      } else {
        this.showProfile = false;
      }
    });
  }

}
