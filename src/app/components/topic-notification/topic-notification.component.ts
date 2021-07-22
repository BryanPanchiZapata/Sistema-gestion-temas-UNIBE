import { TopicApprovalModel } from './../../models/topic-approval-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicStudentModel } from 'src/app/models/topic-student-model';
import { TopicStudentService } from 'src/app/services/topic-student.service';


@Component({
  selector: 'app-topic-notification',
  templateUrl: './topic-notification.component.html',
  styleUrls: ['./topic-notification.component.css'],
})
export class TopicNotificationComponent implements OnInit {
  static END_POINT = 'topic-approval';
  public approval: TopicApprovalModel;
  public topicStudent: TopicStudentModel = {};

  router: any;

  constructor(
    private topicStudentService: TopicStudentService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.sync();
  }

  sync(): void {
    this.topicStudentService
      .getTopicStudentById("10a59c8c-ba96-4afe-bb36-1eba22cf173b")
      .subscribe((data) => (this.approval = data));
  }

  /*  navigateToNotification(approvals: TopicApprovalModel): void {
     this.router.navigate(['/topic-approval/' + approvals.id]);
   } */

  today = Date.now();
  fixedTimezone = this.today;
}
