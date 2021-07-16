import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicApprovalService } from 'src/app/services/topic-approval.service';
import { TopicApprovalModel } from '../../models/topic-approval-model';

@Component({
  selector: 'app-topic-notification',
  templateUrl: './topic-notification.component.html',
  styleUrls: ['./topic-notification.component.css'],
})
export class TopicNotificationComponent implements OnInit {
  static END_POINT = 'topic-approval/:id';
  private readonly id: string | null;
  public approval: TopicApprovalModel;
  router: any;

  constructor(
    private topicApprovalService: TopicApprovalService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.synch();
  }

  synch(): void {
    if (this.id !== null)
      this.topicApprovalService
        .getProductById(this.id)
        .subscribe((data) => (this.approval = data));
  }

 /*  navigateToNotification(approvals: TopicApprovalModel): void {
    this.router.navigate(['/topic-approval/' + approvals.id]);
  } */

  today = Date.now();
  fixedTimezone = this.today;
}
