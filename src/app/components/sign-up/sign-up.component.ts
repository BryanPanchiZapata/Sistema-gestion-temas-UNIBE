import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../models/user-model";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sing-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public user: UserModel = {};

  constructor(private  authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

}

@Component({
  selector:'signup-academic',
  templateUrl:'./sign-up-academic.component.html',
  styleUrls:['./sign-up.component.css']
})
export  class SignUpAcademic {
  constructor() {
  }

}
