import { CareerService } from './../../services/career.service';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { UserAcademicModel, UserModel } from './../../models/user-model';
import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from 'src/app/MyErrorStateMatcher';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  hide: boolean = true;
  static END_POINT = 'profile/:id';
  readonly id: string | null;
  user: UserModel = {};
  userAcademic: UserAcademicModel = {};


  constructor(private route: ActivatedRoute, private authService: AuthService, private careerService: CareerService, private formBuilder: FormBuilder) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  private isValidEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    lastName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    secondName: [''],
    secondLastname: [''],
    role: ['']
  });

  academicForm = this.formBuilder.group({
    sign: ['']
  });

  private initialValuesProfile(user: UserAcademicModel): void {
    this.profileForm.patchValue({
      firstName: this.user.firstName,
      email: this.user.email,
      lastName: this.user.lastName,
      password: this.user.password,
      secondName: this.user.secondName,
      secondLastname: this.user.secondLastname,
      role: this.user.role
    })
  }

  private initialValuesAcademic(userAcademic: UserAcademicModel): void {
    this.profileForm.patchValue({
      sign: this.userAcademic.sign,
    })
  }

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.sync();
  }

  onUpdateProfile() {
    let user = Object.assign(this.profileForm.value, this.academicForm.value);
    if (this.id !== null || this.profileForm.valid, this.academicForm.valid) {
      this.authService.editProfileAcademic(user.id, user).subscribe(
        data => this.userAcademic = data
      );
    }
  }

  onUpdateAdmini() {
    if (this.id !== null && this.profileForm.valid) {
      this.authService.editProfileAdmini(this.id, this.profileForm.value).subscribe(
        data => this.user = data
      );
    }
  }
  sync() {
    if (this.id !== null) {
      this.authService.getUserById(this.id).subscribe(
        data => {
          this.user = data;
          this.initialValuesProfile(this.user);
          if (this.user.role === "STUDENT" || this.user.role === "CAREER_DIRECTOR") {
            this.userAcademic = data;
            this.initialValuesAcademic(this.userAcademic);
          }
        }
      );
    }
  }

  // sync() {
  //   if (this.id !== null) {
  //     if (this.user.role === "STUDENT" || this.user.role === "CAREER_DIRECTOR") {
  //       this.authService.getUserById(this.id).subscribe(
  //         data => {
  //           this.user = data;
  //           this.userAcademic = data;
  //           this.initialValuesProfile(this.user);
  //           this.initialValuesAcademic(this.userAcademic)
  //         }
  //       );
  //     } else if (this.user.role === "FINANCIAL" || this.user.role === "AUTHORITY") {
  //       this.authService.getUserById(this.id).subscribe(
  //         data => {
  //           this.user = data;
  //           this.initialValuesProfile(this.user);
  //         }
  //       );
  //     } else {
  //       alert("Los datos ingresados son incorrectos")
  //     }
  //   }
  // }
}
