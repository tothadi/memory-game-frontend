import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  details: UserDetails;

  user = {
    username: ''
  };

  results = [];

  results1 = [];
  results2 = [];
  results3 = [];
  results4 = [];

  constructor(public auth: AuthenticationService, private Result: ResultService) {

  }

  ngOnInit() {

    this.auth.profile().subscribe(user => {
      this.details = user;
      this.user.username = user.username;
      this.Result.getOwnResults(this.user).subscribe(result => {
        let results = JSON.parse(result);
        let count = results.length;
        for (var i = 0; i < count; i++) {
          if (results[i].level === 1) {
            this.results1.push(results[i]);
          } else if (results[i].level === 2) {
            this.results2.push(results[i]);
          } else if (results[i].level === 3) {
            this.results3.push(results[i]);
          } else {
            this.results4.push(results[i]);
          }
        }
        if (this.results1.length) { this.results.push(this.results1) };
        if (this.results2.length) { this.results.push(this.results2) };
        if (this.results3.length) { this.results.push(this.results3) };
        if (this.results4.length) { this.results.push(this.results4) };
      }, (err) => {
        console.error(err);
      });
    }, (err) => {
      console.error(err);
    });

  }
}
