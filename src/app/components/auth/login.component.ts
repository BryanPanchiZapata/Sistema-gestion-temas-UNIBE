import { FormBuilder, Validators } from '@angular/forms';
import { UserModel } from './../../models/user-model';
import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MyErrorStateMatcher } from 'src/app/MyErrorStateMatcher';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./auth.component.css']
})
export class LoginComponent {
  public user: UserModel = {};

  matcher = new MyErrorStateMatcher();

  hide: boolean = true;

  loginForm = this.formBuilder.group({
    ci: ['', Validators.required],
    password: ['', Validators.required]

  });

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
  }

  OnResetForm() {
    this.loginForm.reset();
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        data => {
          if (this.authService.getRole() === 'FINANCIAL') {
            this.router.navigate(['/payment-registration']);
            this.loginForm.reset();
          } else {
            this.router.navigate(['']);
            this.loginForm.reset();
          }
        }
      )
    }
  }
}
