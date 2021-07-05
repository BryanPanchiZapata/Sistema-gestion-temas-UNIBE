import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/user-model";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: UserModel = {};

  constructor(private  authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }
  login():void{
    this.authService.login(this.user).subscribe(
      data => {
        localStorage.setItem('user', data.id);
        this.router.navigate(['topic-banck']);
      }
    )
}

}
