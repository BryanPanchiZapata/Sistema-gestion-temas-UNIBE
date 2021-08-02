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

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.role = this.authService.getRole();
  }

  logOut() {
    this.authService.logOut();
    window.location.reload();
  }
}
