import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    username: '',
    fullname: '',
    password: ''
  };

  regError = false;
  errorMessage = '';

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/setup');
    }, (err) => {
      this.errorMessage = err.message;
      this.regError = true;
    });
  }

  closeError() {
    this.errorMessage = '';
    this.regError = false;
  }
}
