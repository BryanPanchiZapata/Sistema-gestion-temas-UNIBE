import { TopicProposalService } from 'src/app/services/topic-proposal.service';
import { TopicDenunciationService } from 'src/app/services/topic-denunciation.service';
import { TopicApprovalService } from 'src/app/services/topic-approval.service';
import { TopicProposalModel } from 'src/app/models/topic-proposal-model';
import { TopicDenunciationModel } from 'src/app/models/topic-denunciation-model';
import { TopicApprovalModel } from 'src/app/models/topic-approval-model';
import { AuthService } from './../../../services/auth.service';
import { UserAcademicModel } from './../../../models/user-model';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TopicStudentModel } from 'src/app/models/topic-student-model';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TopicStudentService } from 'src/app/services/topic-student.service';

@Component({
  selector: 'app-executed-topic',
  templateUrl: './executed-topic.component.html',
  styleUrls: ['./executed-topic.component.css'],
})
export class ExecutedTopicComponent implements AfterViewInit {
  dataStudent = new MatTableDataSource();
  academic: UserAcademicModel = {};

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private topicStudentService: TopicStudentService,
    public dialog: MatDialog,
    private authServices: AuthService
  ) {}

  ngOnInit(): void {
    this.dataStudent.paginator = this.paginator;
    this.getDataUser();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataStudent.filter = filterValue.trim().toLowerCase();
    console.log(this.dataStudent)
  }

  getDataUser() {
    this.authServices.profileUser().subscribe((data) => {
      this.academic = data;
      this.sync();
    });
  }

  sync() {
    if (this.academic.career?.id) {
      this.topicStudentService
        .getTopicStudentsByCareer(this.academic.career?.id, 'Ejecutado')
        .subscribe((data) => {
          this.dataStudent = new MatTableDataSource(data);
        });
    } else {
      this.topicStudentService
        .getTopicsByStatus('Ejecutado')
        .subscribe((data) => {
          this.dataStudent = new MatTableDataSource(data);
        });
    }
  }

  openDialogTopicStudentAssigned(id: string | null) {
    this.dialog.open(DialogStatusAssignedComponent, {
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
  ];

  ngAfterViewInit() {}
}

@Component({
  selector: 'dialog-status-assigned',
  templateUrl: './dialog-status-assigned.component.html',
  styleUrls: ['./executed-topic.component.css'],
})
export class DialogStatusAssignedComponent {
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
    public dialogRef: MatDialogRef<DialogStatusAssignedComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string,
    private approvalNotificationSrv: TopicApprovalService,
    private denunciationSvr: TopicDenunciationService,
    private proposalSvr: TopicProposalService,
  ) { }

  ngOnInit(): void {
    this.synch();
    this.spinnerService.hide();
  }

  synch(): void {
    if (this.id !== null)
      this.topicService
        .getTopicStudentById(this.id)
        .subscribe(data => {
          this.topicStudent = data;
          this.getApprovalNotificationById();
          this.getDenunciationById();
          this.getProposalById();
        });
  }

  getApprovalNotificationById() {
    if (this.topicStudent.id)
      this.approvalNotificationSrv.getTopicNotificationById(this.topicStudent.id).subscribe(
        data => {
          this.approvalNotification = data;
          this.haveNotification = true;
        }
      )
  }

  getDenunciationById() {
    if (this.topicStudent.id)
      this.denunciationSvr.getTopicDenunciationById(this.topicStudent.id).subscribe(
        data => {
          this.denunciation = data;
          this.haveDenunciation = true;
        }
      )
  }

  getProposalById() {
    if (this.topicStudent.topic?.id)
      this.proposalSvr.getTopicProposalById(this.topicStudent.topic.id).subscribe(
        data => {
          this.proposal = data;
          this.haveProposal = true;
        }
      )
  }
}
