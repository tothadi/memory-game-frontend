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

  constructor(public auth: AuthenticationService, private location: Location, private router: Router) {
    
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (this.location.path() === '/setup' || this.location.path() === '/result') {
        this.showProfile = true;
      } else {
        this.showProfile = false;
      }
    });    
  }

}
