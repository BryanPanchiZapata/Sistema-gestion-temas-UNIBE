import { TopicEvaluation } from './../../models/topic-student-model';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { TopicApprovalModel } from './../../models/topic-approval-model';
import { Component, OnInit } from '@angular/core';
import { TopicStudentModel } from 'src/app/models/topic-student-model';
import { TopicStudentService } from 'src/app/services/topic-student.service';
import { MatStepper } from '@angular/material/stepper';


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

  constructor(
    private topicStudentService: TopicStudentService,
    private formBuilder: FormBuilder,
  ) {
  }

  ciStudentControl = new FormControl('', [
    Validators.required,
  ]);

  evaluationForm = this.formBuilder.group({
    topicEvaluation: ['', Validators.required,]
  });

  notificationForm = this.formBuilder.group({
    documentNumber: ['', Validators.required],
    meetingDate: ['', Validators.required],
    meetingNumber: ['', Validators.required],
    observations: ['', Validators.required],
  })

  tratamientoControl = new FormControl('', [
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


  onEvaluationProposal(stepper: MatStepper) {
    if (this.evaluationForm.valid)
      if (this.topicStudent.id)
        this.topicStudentService.evaluationProposal(this.topicStudent.id, this.evaluationForm.value).subscribe(
          data => {
            stepper.next();
          }
        );
  }

  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  year = new Date().getFullYear();
  monthNumber = new Date().getMonth();
  month = this.monthNames[this.monthNumber]
  day = new Date().getDay();
}
