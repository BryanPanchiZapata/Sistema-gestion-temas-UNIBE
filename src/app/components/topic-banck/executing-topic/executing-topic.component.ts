import { TopicProposalService } from 'src/app/services/topic-proposal.service';
import { TopicDenunciationService } from 'src/app/services/topic-denunciation.service';
import { TopicApprovalService } from 'src/app/services/topic-approval.service';
import { TopicProposalModel } from 'src/app/models/topic-proposal-model';
import { TopicDenunciationModel } from 'src/app/models/topic-denunciation-model';
import { TopicApprovalModel } from 'src/app/models/topic-approval-model';
import { TopicModel } from 'src/app/models/topic-model';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TopicStudentModel } from 'src/app/models/topic-student-model';
import { UserAcademicModel } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TopicStudentService } from 'src/app/services/topic-student.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-executing-topic',
  templateUrl: './executing-topic.component.html',
  styleUrls: ['./executing-topic.component.css'],
})
export class ExecutingTopicComponent implements OnInit {
  role: String | null;
  academic: UserAcademicModel = {};
  topicStudent: TopicStudentModel = {};
  haveTopic = false;
  dataStudent = new MatTableDataSource();

  constructor(
    private topicStudentService: TopicStudentService,
    public topicService: TopicService,
    public dialog: MatDialog,
    private authService: AuthService,
    private topicStudentSvr: TopicStudentService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.getDataUser();
    if (this.role === 'STUDENT') this.onFindTopicbyStudent();
  }

  onFindTopicbyStudent() {
    this.topicStudentSvr.getTopicStudentByStudentId().subscribe((data) => {
      this.topicStudent = data;
      this.haveTopic = true;
    });
  }

  chooseTopic(topic: TopicModel) {
    let topicStudent = Object.assign({ topic: topic, student: this.academic });
    this.topicStudentSvr.assigmentTopic(topicStudent).subscribe((data) => {
      this.topicStudent = data;
      this.onFindTopicbyStudent();
      window.location.reload();
    });
  }

  getDataUser() {
    this.authService.profileUser().subscribe((data) => {
      this.academic = data;
      this.sync();
    });
  }

  sync() {
    if (this.academic.career?.id) {
      this.topicStudentService
        .getTopicStudentsByCareer(this.academic.career?.id, 'En ejecución')
        .subscribe((data) => {
          this.dataStudent = new MatTableDataSource(data);
        });
    } else {
      this.topicStudentService
        .getTopicsByStatus('En ejecución')
        .subscribe((data) => {
          this.dataStudent = new MatTableDataSource(data);
        });
    }
  }

  openDialogTopicStudentExecuting(id: string | null) {
    this.dialog.open(DialogStatusExecutingComponent, {
      data: id,
    });
  }

  displayedColumns: string[] = [
    'position',
    'tema',
    'articulacion',
    'pago',
    'cedula',
    'carrera',
    'fecha',
    'evaluacion',
    'accion',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataStudent.filter = filterValue.trim().toLowerCase();
  }

  onChangeToExecuted(id: string) {
    this.topicService.changeToExecuted(id).subscribe((data) => {
      this.sync();
    });
  }
}

@Component({
  selector: 'dialog-status-executing',
  templateUrl: './dialog-status-executing.component.html',
  styleUrls: ['./executing-topic.component.css'],
})
export class DialogStatusExecutingComponent {
  public topicStudent: TopicStudentModel;
  approvalNotification: TopicApprovalModel = {};
  denunciation: TopicDenunciationModel = {};
  proposal: TopicProposalModel = {};
  haveNotification = false;
  haveDenunciation = false;
  haveProposal = false;

  constructor(
    private topicService: TopicStudentService,
    private spinnerService: SpinnerService,
    public dialogRef: MatDialogRef<DialogStatusExecutingComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string,
    private approvalNotificationSrv: TopicApprovalService,
    private denunciationSvr: TopicDenunciationService,
    private proposalSvr: TopicProposalService
  ) {}

  ngOnInit(): void {
    this.sync();
    this.spinnerService.hide();
  }

  sync(): void {
    if (this.id !== null)
      this.topicService.getTopicStudentById(this.id).subscribe((data) => {
        this.topicStudent = data;
        this.getApprovalNotificationById();
        this.getDenunciationById();
        this.getProposalById();
      });
  }

  getApprovalNotificationById() {
    if (this.topicStudent.id)
      this.approvalNotificationSrv
        .getTopicNotificationById(this.topicStudent.id)
        .subscribe((data) => {
          this.approvalNotification = data;
          this.haveNotification = true;
        });
  }

  getDenunciationById() {
    if (this.topicStudent.id)
      this.denunciationSvr
        .getTopicDenunciationById(this.topicStudent.id)
        .subscribe((data) => {
          this.denunciation = data;
          this.haveDenunciation = true;
        });
  }

  getProposalById() {
    if (this.topicStudent.topic?.id)
      this.proposalSvr
        .getTopicProposalById(this.topicStudent.topic.id)
        .subscribe((data) => {
          this.proposal = data;
          this.haveProposal = true;
        });
  }
}
