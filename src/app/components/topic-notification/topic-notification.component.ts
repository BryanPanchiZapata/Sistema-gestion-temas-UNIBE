import { TopicEvaluation } from './../../models/topic-student-model';
import { FormControl, Validators } from '@angular/forms';
import { TopicApprovalModel, Titles } from './../../models/topic-approval-model';
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
  public evaluations = TopicEvaluation;
  public titles = Titles;

  constructor(
    private topicStudentService: TopicStudentService,
    private route: ActivatedRoute
  ) {
  }

  ciStudentControl = new FormControl('', [
    Validators.required,
  ]);

  evaluationControl = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit(): void {
  }

  refresh(): void {
    window.location.reload();
  }

  onReset() {
    this.ciStudentControl.reset();
    this.refresh();
  }

  onFindByStudent() {
    if (this.ciStudentControl.valid)
      this.topicStudentService.getTopicStudentByStudent(this.ciStudentControl.value).subscribe(
        data => {
          this.topicStudent = data;
        }
      )
  }


  onEvaluationProposal() {
    // if (this.id !== null)
    // if (this.evaluationControl.valid)
    //   this.topicStudentService.evaluationProposal(data.id, this.evaluationControl.value).subscribe(
    //     data => {
    //       this.topicStudent = data;
    //     }
    //   )
  }

  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  year = new Date().getFullYear();
  monthNumber = new Date().getMonth();
  month = this.monthNames[this.monthNumber]
  day = new Date().getDay();
}
