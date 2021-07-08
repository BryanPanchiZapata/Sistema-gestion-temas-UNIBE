import { Component, OnInit } from '@angular/core';
import { UserModel } from "../../models/user-model";
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

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
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


  constructor() {
  }
}
