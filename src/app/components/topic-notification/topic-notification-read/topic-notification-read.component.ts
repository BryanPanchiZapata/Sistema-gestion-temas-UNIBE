import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopicApprovalModel } from 'src/app/models/topic-approval-model';
import { TopicApprovalService } from 'src/app/services/topic-approval.service';

@Component({
  selector: 'app-topic-notification-read',
  templateUrl: './topic-notification-read.component.html',
  styleUrls: ['../topic-notification.component.css'],
})
export class TopicNotificationReadComponent implements OnInit {
  static END_POINT = 'topic-approval/:id';
  public topicNotification: TopicApprovalModel;
  private readonly id: string | null;
  route: any;

  monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  year = new Date().getFullYear();
  monthNumber = new Date().getMonth();
  month = this.monthNames[this.monthNumber];
  now = Date.now();
  day = new Date(this.now).getDate();

  constructor(
    private notificationApprovalSrv: TopicApprovalService,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.sync();
  }

  sync(): void {
    if (this.id !== null)
      this.notificationApprovalSrv
        .getTopicNotificationById(this.id)
        .subscribe((data) => {
          this.topicNotification = data;
        });
  }
}
