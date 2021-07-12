import { UserModel } from './../../models/user-model';
import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./auth.component.css']
})
export class LoginComponent {
  public user: UserModel = {};

  hide: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
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
