import { UserModel } from './../../models/user-model';
import { TopicDenunciationModel } from 'src/app/models/topic-denunciation-model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role: String | null;
  denunciation: TopicDenunciationModel = {};
  user: UserModel = {};

  constructor(
    private authService: AuthService,
  ) {
  }

  getInfoUser() {
    this.authService.profileUser().subscribe(
      data =>{
        this.user = data;
      }
    )
  }

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.getInfoUser();
  }

  logOut() {
    this.authService.logOut();
    window.location.reload();
  }
}
