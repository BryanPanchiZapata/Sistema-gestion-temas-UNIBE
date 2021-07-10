import { Observable } from 'rxjs';
import { UserModel, UserRole } from './../../models/user-model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: UserModel = {};

  hide: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }
  login(): void {
    this.authService.login(this.user).subscribe(
      data => {
        localStorage.setItem('user', data.id);
        this.router.navigate(['']);
      }
    )
  }

}

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./login.component.css']
})
export class SignUpComponent {
  hide: boolean = true;

  public response:any = [];
  public user: UserModel = {};

  keys = Object.keys;
  userRoles = UserRole;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  private isValidEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  registerForm = this.formBuilder.group({
    ci:['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    firstName:['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role: ['', Validators.required],
    secondName:[''],
    secondLastname: [''],

  });

  OnResetForm() {
    this.registerForm.reset();
  }

  onSignUpAdmini() {
    this.authService.signUpAdmini(this.registerForm.value).subscribe(
      data => {
        this.router.navigate(['']);
      }
    );
  }
}
