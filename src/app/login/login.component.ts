import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.auth.isTokenExpired()) this.router.navigate(['dashboard']);
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.pattern(/^[0-9]*$/),
  ]);

  passwordFormControl = new FormControl('', [Validators.required]);

  onKeyPress(event: any){
    console.log(event) 
    this.login()
  }
  login(): void {
    console.log(this.emailFormControl.value, this.passwordFormControl.value);
    this.auth
      .login(this.emailFormControl.value, this.passwordFormControl.value)
      .subscribe((res) => {
        console.log(res);
        if (res.message != 'auth successful')
          return this._snackBar.open(res.message, 'Ok!', {
            duration: 2000,
          });
        this.auth.setToken(res.token);
        window.location.reload();
        // return this.router.navigate(['dashboard']);
      });
  }
}
