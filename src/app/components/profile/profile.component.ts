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
  static END_POINT = 'profile';
  user: UserModel = {};
  userAcademic: UserAcademicModel = {};

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
  }

  private isValidEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    lastName: ['', Validators.required],
    secondName: [''],
    secondLastname: ['']
  });

  private initialValuesProfile(user: UserModel): void {
    this.profileForm.patchValue({
      firstName: user.firstName,
      email: user.email,
      lastName: user.lastName,
      secondName: user.secondName,
      secondLastname: user.secondLastname
    })
  }

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.sync();
  }

  sync() {
    this.authService.profileUser().subscribe(
      data => {
        this.user = data;
        this.initialValuesProfile(this.user);
        if (this.user.role === "STUDENT" || this.user.role === "CAREER_DIRECTOR") {
          this.userAcademic = data;
        }
      }
    );
  }

  onCancel() {
    this.initialValuesProfile(this.user);
  }

  onUpdateProfile() {
    if (this.profileForm.valid) {
      this.authService.editProfile(this.profileForm.value).subscribe(
        data => this.user = data
      );
      this.sync();
      alert("Perfil actualizado")
    }
  }
}
