import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { UserAcademicModel, UserModel } from './../../models/user-model';
import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from 'src/app/MyErrorStateMatcher';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  private isValidEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    lastName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    secondName: [''],
    secondLastname: ['']
  });

  academicForm = this.formBuilder.group({
    sign: ['']
  });

  private initialValuesProfile(user: UserModel): void {
    this.profileForm.patchValue({
      firstName: user.firstName,
      email: user.email,
      lastName: user.lastName,
      password: user.password,
      secondName: user.secondName,
      secondLastname: user.secondLastname
    })
  }

  private initialValuesAcademic(userAcademic: UserAcademicModel): void {
    this.academicForm.patchValue({
      sign: userAcademic.sign
    })
  }

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.sync();
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

  onCancel() {
    this.initialValuesAcademic(this.userAcademic);
    this.initialValuesProfile(this.user);
  }

  refresh(): void {
    window.location.reload();
  }

  onUpdateProfile() {
    if (this.id !== null) {
      let user = Object.assign(this.profileForm.value, this.academicForm.value);
      if (this.user.role === "STUDENT" || this.user.role === "CAREER_DIRECTOR") {
        if (this.profileForm.valid && this.academicForm.valid) {
          this.authService.editProfileAcademic(this.id, user).subscribe(
            data => this.userAcademic = data
          );
          this.refresh();
          alert("Perfil actualizado");
        } else {
          alert("Los datos ingresados son incorrectos")
        }
      } else if (this.user.role === "FINANCIAL" || this.user.role === "AUTHORITY") {
        if (this.profileForm.valid) {
          this.authService.editProfileAdmini(this.id, this.profileForm.value).subscribe(
            data => this.user = data
          );
        this.refresh();
          alert("Perfil actualizado")
        } else {
          alert("Los datos ingresados son incorrectos")
        }
      }
    }
  }
}
