import { Component, OnInit } from '@angular/core';
import { TopicApprovalService } from 'src/app/services/topic-approval.service';
import { TopicApprovalModel } from '../../models/topic-approval-model'

@Component({
  selector: 'app-topic-notification',
  templateUrl: './topic-notification.component.html',
  styleUrls: ['./topic-notification.component.css'],
})
export class TopicNotificationComponent implements OnInit {
  static END_POINT = 'topic-approval';

  public approvals:TopicApprovalModel[];

  constructor(private topicApprovalService: TopicApprovalService) {
    this.approvals = [];
  }

  ngOnInit(): void {
    this.synch();
  }

  synch(): void {
    this.topicApprovalService.getAllTopicApproval().subscribe((data) => {
      this.approvals = data;
      console.log(data);
    });
  }
  today = Date.now();
    fixedTimezone = this.today;
}
