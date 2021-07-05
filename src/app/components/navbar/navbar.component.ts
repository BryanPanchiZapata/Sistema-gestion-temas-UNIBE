import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
<<<<<<< HEAD

  constructor(private router: Router) {
  }
=======
static END_POINT= 'topic'
  constructor() { }
>>>>>>> bryan

  ngOnInit(): void {
    this.canBeActivate();
  }

  canBeActivate(): void {
    if (localStorage.getItem('user') === '' || localStorage.getItem('user') === null)
      this.router.navigate(['/login'])
  }
}
