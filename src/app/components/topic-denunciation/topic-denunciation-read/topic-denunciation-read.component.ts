import { AuthService } from './../../../services/auth.service';
import { UserAcademicModel } from './../../../models/user-model';
import { AcademicUserService } from './../../../services/academic-user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicDenunciationModel } from 'src/app/models/topic-denunciation-model';
import { TopicStudentModel } from 'src/app/models/topic-student-model';
import { TopicDenunciationService } from 'src/app/services/topic-denunciation.service';


@Component({
  selector: 'app-topic-denunciation-read',
  templateUrl: './topic-denunciation-read.component.html',
  styleUrls: ['../topic-denunciation.component.css'],
})
export class TopicDenunciationReadComponent implements OnInit {
  static END_POINT = 'topic-denunciation/read/:id';
  private readonly id: string | null;
  public denunciation: TopicDenunciationModel = {};
  role: String | null;
  public topicStudent: TopicStudentModel;
  public academicUser: UserAcademicModel = {};

  constructor(
    private denunciationSrv: TopicDenunciationService,
    private academicSvr: AcademicUserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  print(elementPrint: string) {
    const printContent = document.getElementById(elementPrint);
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    if (printContent) WindowPrt?.document.write(printContent.innerHTML);
    WindowPrt?.document.close();
    WindowPrt?.focus();
    WindowPrt?.print();
    WindowPrt?.close();
  }

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.sync();
  }

  sync(): void {
    if (this.id !== null)
      this.denunciationSrv
        .getTopicDenunciationById(this.id)
        .subscribe((data) => {
          this.denunciation = data;
          this.onGetCareerDirector();
        });
  }

  onDeleteDenunciation() {
    if(this.denunciation?.id)
    this.denunciationSrv.deleteDenunciation(this.denunciation?.id).subscribe(
      data => {
        this.denunciation = data;
        this.router.navigate(['/'])
      }
    )
  }

  onGetCareerDirector() {
    if (this.denunciation?.topicStudent?.topic?.career?.id)
      this.academicSvr.getDirectorCareer(this.denunciation?.topicStudent?.topic?.career?.id).subscribe(
        data => {
          this.academicUser = data;
        }
      )
  }

}
