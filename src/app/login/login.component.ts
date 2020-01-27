import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: TokenPayload = {
    fullname: '',
    username: '',
    email: '',
    password: ''
  };

  loginError = false;
  errorMessage = '';

  constructor(private auth: AuthenticationService, private router: Router) { }

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/setup');
    }, (err) => {
      this.loginError = true;
      this.errorMessage = err.error.message;
    });
  }

  closeError() {
    this.errorMessage = '';
    this.loginError = false;
  }
}
