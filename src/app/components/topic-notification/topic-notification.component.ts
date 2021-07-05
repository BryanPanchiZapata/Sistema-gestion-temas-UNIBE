import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topic-notification',
  templateUrl: './topic-notification.component.html',
  styleUrls: ['./topic-notification.component.css']
})
export class TopicNotificationComponent implements OnInit {
  static END_POINT = 'topic-approval';
  constructor() { }

  ngOnInit(): void {
  }

}
