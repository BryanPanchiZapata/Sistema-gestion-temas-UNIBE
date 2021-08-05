import { AuthService } from './../../../services/auth.service';
import { AcademicUserService } from './../../../services/academic-user.service';
import { UserAcademicModel } from './../../../models/user-model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicApprovalModel } from 'src/app/models/topic-approval-model';
import { TopicEvaluation, TopicStudentModel } from 'src/app/models/topic-student-model';
import { TopicApprovalService } from 'src/app/services/topic-approval.service';

@Component({
  selector: 'app-topic-notification-read',
  templateUrl: './topic-notification-read.component.html',
  styleUrls: ['../topic-notification.component.css'],
})
export class TopicNotificationReadComponent implements OnInit {
  static END_POINT = 'topic-approval/read/:id';
  public topicNotification: TopicApprovalModel;
  public topicStudent: TopicStudentModel;
  public academicUser: UserAcademicModel = {};
  public evaluations = TopicEvaluation;
  role: String | null;
  private readonly id: string | null;

  constructor(
    private notificationApprovalSrv: TopicApprovalService,
    private academicSvr: AcademicUserService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  print(elementPrint: string) {
    let printContent = document.getElementById(elementPrint);
    let WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    if(printContent) WindowPrt?.document.write(printContent.innerHTML);
    WindowPrt?.document.close();
    WindowPrt?.focus();
    WindowPrt?.print();
    WindowPrt?.close();
  }

  @ViewChild('notification', {static: false}) el!: ElementRef;

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.sync();
  }

  sync(): void {
    if (this.id !== null)
      this.notificationApprovalSrv
        .getTopicNotificationById(this.id)
        .subscribe((data) => {
          this.topicNotification = data;
          this.onGetCareerDirector();
        });
  }

  onDeleteNotification() {
    if(this.topicNotification?.id)
    this.notificationApprovalSrv.deleteNotification(this.topicNotification?.id).subscribe(
      data => {
        this.topicNotification = data;
        this.router.navigate(['/'])
      }
    )
  }

  onGetCareerDirector() {
    if (this.topicNotification?.topicStudent?.topic?.career?.id)
      this.academicSvr.getDirectorCareer(this.topicNotification?.topicStudent?.topic?.career?.id).subscribe(
        data => {
          this.academicUser = data;
        }
      )
  }
}
