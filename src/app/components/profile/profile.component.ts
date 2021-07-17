import { CareerModel } from './../../models/career-model';
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
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  hide: boolean = true;
  static END_POINT = 'profile/:id';
  public readonly id: string | null;
  public user: UserModel = {};
  public userAcademic: UserAcademicModel = {};
  careers: CareerModel[];


  constructor(private route: ActivatedRoute, private authService: AuthService, private careerService: CareerService, private formBuilder: FormBuilder) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  private isValidEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  profileForm = this.formBuilder.group({
    ci: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    secondName: [''],
    secondLastname: ['']
  });

  careerForm = this.formBuilder.group({
    career: ['', Validators.required]
  });

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {

    this.sync();

    this.careerService.getAllCareers().subscribe(
      data => {
        this.careers = data;
      }
    )
  }

  sync(): void {
    if (this.id !== null) this.authService.getAcademicById(this.id).subscribe(
      data => this.userAcademic = data
    );
    console.log(this.id)
    console.log(this.userAcademic)
  }

  syncAdmini(): void {
    if (this.id !== null)
      this.authService.getAdminiById(this.id).subscribe(
        data => this.user = data
      );
  }

  onUpdateAcademic() {
    let user = Object.assign(this.profileForm.value, this.careerForm.value);
    if (this.id !== null && this.profileForm.valid && this.careerForm.valid) {
      this.authService.editProfileAcademic(this.id, user).subscribe(
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
}
