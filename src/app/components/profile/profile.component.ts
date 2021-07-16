import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileModel } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  static END_POINT = 'profile/:id';
  public academics: ProfileModel[];
  id: string | null;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.synch();
  }

  synch(): void {
    if (this.id !== null)
      this.profileService
        .getByIdAcademic(this.id)
        .subscribe((data) => (this.academics = data));
  }
}


