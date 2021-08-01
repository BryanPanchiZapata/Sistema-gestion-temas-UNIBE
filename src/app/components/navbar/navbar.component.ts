import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { UserAcademicModel } from './../../models/user-model';
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role: String | null;

  constructor(
    private router: Router,
    private authService: AuthService,
    ) {  }

  ngOnInit(): void {
    this.role = this.authService.getRole();
  }

  logOut() {
    this.authService.logOut();
    window.location.reload();
  }
}
