import { FormControl, Validators } from '@angular/forms';
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

  constructor(
    private topicStudentService: TopicStudentService,
    private route: ActivatedRoute
  ) {

  }

  ciStudentControl = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit(): void {
  }

  onFindByStudent() {
    if (this.ciStudentControl.valid)
    this.topicStudentService.getTopicStudentByStudent(this.ciStudentControl.value).subscribe(
      data => {
        this.topicStudent = data;
      }
    )
  }
  refresh(): void {
    window.location.reload();
  }

  onReset() {
    this.ciStudentControl.reset();
    this.refresh();
  }

  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  year = new Date().getFullYear();
  monthNumber = new Date().getMonth();
  month = this.monthNames[this.monthNumber]
  day = new Date().getDay();
}
