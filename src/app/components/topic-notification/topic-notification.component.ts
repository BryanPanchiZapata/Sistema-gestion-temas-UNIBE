import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { UserAcademicModel } from './../../models/user-model';
import { TopicApprovalService } from './../../services/topic-approval.service';
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
  static END_POINT = 'topic-approval/create';
  public approval: TopicApprovalModel;
  public topicStudent: TopicStudentModel = {};
  public evaluations = TopicEvaluation;
  stepper: MatStepper;
  academic: UserAcademicModel = {};

  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  year = new Date().getFullYear();
  monthNumber = new Date().getMonth();
  month = this.monthNames[this.monthNumber]
  now = Date.now();
  day = new Date(this.now).getDate();

  constructor(
    private topicStudentService: TopicStudentService,
    private formBuilder: FormBuilder,
    private notificationApprovalSrv: TopicApprovalService,
    private authServices: AuthService,
    private router: Router,
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
    trato: ['', Validators.required],
  });

  observations = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit(): void {
    this.getDataUser();
  }

  getDataUser() {
    this.authServices.profileUser().subscribe(
      data => {
        this.academic = data;
        this.onFindByStudent();
      }
    );
  }

  refresh(): void {
    window.location.reload();
  }

  onReset() {
    this.ciStudentControl.reset();
    this.refresh();
  }

  resetForms() {
    this.notificationForm.reset();
    this.evaluationForm.reset();
    this.observations.reset();
  }

  onFindByStudent() {
    if (this.academic.career?.id)
      if (this.ciStudentControl.valid)
        this.topicStudentService.getTopicStudentByStudent(this.ciStudentControl.value, this.academic.career?.id).subscribe(
          data => {
            this.topicStudent = data;
            this.resetForms();
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

  onCancel(stepper: MatStepper) {
    this.notificationForm.reset();
    stepper.previous();
  }

  onCreateNotification() {
    if (this.topicStudent.topicEvaluation === 'Aprobado') {
      if (this.notificationForm.valid) {
        let notification = Object.assign(this.notificationForm.value, { topicStudent: this.topicStudent })
        this.notificationApprovalSrv.createNotification(notification).subscribe(
          data => {
            this.approval = data
            this.resetForms();
            this.ciStudentControl.reset();
            alert("La notificación ha sido enviada");
            this.router.navigate(['topic-approval/read/' + this.topicStudent.id]);
          }
        )
      }
    } else if (this.topicStudent.topicEvaluation === 'Reprobado' || this.topicStudent.topicEvaluation === 'Aprobado con observaciones') {
      if (this.notificationForm.valid && this.observations.valid) {
        let notification = Object.assign(this.notificationForm.value, { topicStudent: this.topicStudent, observations: this.observations.value })
        this.notificationApprovalSrv.createNotification(notification).subscribe(
          data => {
            this.approval = data;
            this.resetForms();
            this.ciStudentControl.reset();
            alert("La notificación ha sido enviada");
            this.router.navigate(['topic-approval/read/' + this.topicStudent.id]);
          }
        )

      } else {
        this.observations.markAsTouched()
      }
    }
  }
}
