import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { CareerService } from './../../../services/career.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserModel, UserRole } from './../../../models/user-model';
import { Component, OnInit } from '@angular/core';
import { CareerModel } from 'src/app/models/career-model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../auth.component.css']
})
export class SignUpComponent implements OnInit {
  hide: boolean = true;

  response: any = [];
  user: UserModel = {};
  careers: CareerModel[];
  userRoles = UserRole;

  constructor(private formBuilder: FormBuilder, private careerService: CareerService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.careerService.getAllCareers().subscribe(
      data => {
        this.careers = data;
      }
    )
  }

  private isValidEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  registerForm = this.formBuilder.group({
    ci: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    secondName: [''],
    secondLastname: [''],
  });

  roleForm = this.formBuilder.group({
    role: ['', Validators.required]
  });

  careerForm = this.formBuilder.group({
    career: ['', Validators.required]
  });


  OnResetForm() {
    this.registerForm.reset();
    this.roleForm.reset();
    this.careerForm.reset();
  }

  onSignUpAdmini() {
    let user = Object.assign(this.registerForm.value, this.roleForm.value);
    if (this.registerForm.valid, this.roleForm.valid) {
      this.authService.signUpAdmini(user).subscribe(
        data => {
          this.router.navigate(['']);
          this.OnResetForm();
        }
      );
    }
  }

  onSignUpAcademic() {
    let user = Object.assign(this.registerForm.value, this.roleForm.value, this.careerForm.value);
    if (this.registerForm.valid, this.roleForm.valid, this.careerForm.valid) {
      this.authService.signUpAcademic(user).subscribe(
        data => {
          this.router.navigate(['']);
          this.OnResetForm();
        }
      );
    }
  }
}
