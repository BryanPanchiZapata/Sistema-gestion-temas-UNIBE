import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { CareerService } from './../../../services/career.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserModel, UserRole } from './../../../models/user-model';
import { Component, OnInit } from '@angular/core';
import { CareerModel } from 'src/app/models/career-model';
import { MyErrorStateMatcher } from 'src/app/MyErrorStateMatcher';

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
    role: ['', Validators.required],
  });

  careerForm = this.formBuilder.group({
    career: ['', Validators.required]
  });

  matcher = new MyErrorStateMatcher();

  OnResetForm() {
    this.registerForm.reset();
    this.careerForm.reset();
  }

  refresh(): void {
    window.location.reload();
  }

  onSignUp() {
    let user = Object.assign(this.registerForm.value, this.careerForm.value);
    if (user.role === "STUDENT" || user.role === "CAREER_DIRECTOR") {
      if (this.registerForm.valid && this.careerForm.valid) {
        this.authService.signUpAcademic(user).subscribe(
          data => {
            alert("Usuario registrado con éxito, inicie sesión");
            this.refresh();
            this.OnResetForm();
          }
        );
      } else {
        this.careerForm.controls.career.markAsTouched();
      }
    } else if (user.role === "FINANCIAL" || user.role === "AUTHORITY") {
      if (this.registerForm.valid) {
        this.authService.signUpAdmini(this.registerForm.value).subscribe(
          data => {
            alert("Usuario registrado con éxito, inicie sesión")
            this.refresh();
            this.OnResetForm();
          }
        );
      }
    }
  }
}
