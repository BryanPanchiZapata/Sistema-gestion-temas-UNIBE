import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicStudentModel } from 'src/app/models/topic-student';
import { TopicStudentService } from 'src/app/services/topic-student.service';


@Component({
  selector: 'app-topic-notification',
  templateUrl: './topic-notification.component.html',
  styleUrls: ['./topic-notification.component.css'],
})
export class TopicNotificationComponent implements OnInit {
  static END_POINT = 'topic-approval';
  private readonly id: string | null;
  public approval : TopicStudentModel;
  router: any;

  constructor(
    private topicStudentService: TopicStudentService,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    this.synch();
  }

  synch(): void {
    if (this.id !== null)
      this.topicStudentService
        .getTopicStudentById(this.id)
        .subscribe((data) => (this.approval = data));
  }

 /*  navigateToNotification(approvals: TopicApprovalModel): void {
    this.router.navigate(['/topic-approval/' + approvals.id]);
  } */

  today = Date.now();
  fixedTimezone = this.today;
}
