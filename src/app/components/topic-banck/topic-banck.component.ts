import { TopicProposalService } from 'src/app/services/topic-proposal.service';
import { TopicDenunciationService } from 'src/app/services/topic-denunciation.service';
import { TopicProposalModel } from 'src/app/models/topic-proposal-model';
import { TopicDenunciationModel } from 'src/app/models/topic-denunciation-model';
import { TopicApprovalModel } from 'src/app/models/topic-approval-model';
import { TopicApprovalService } from 'src/app/services/topic-approval.service';
import { UserAcademicModel } from './../../models/user-model';
import { AuthService } from './../../services/auth.service';
import { TopicStudentModel } from 'src/app/models/topic-student-model';
import { TopicStudentService } from 'src/app/services/topic-student.service';
import {
  AfterViewInit,
  Component,
  Inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { MatTableDataSource } from '@angular/material/table';
import { TopicService } from 'src/app/services/topic.service';
import { TopicModel } from 'src/app/models/topic-model';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-topic-banck',
  styleUrls: ['./topic-banck.component.css'],
  templateUrl: './topic-banck.component.html',
})
export class TopicBanckComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'tema',
    'articulacion',
    'carrera',
    'accion',
  ];

  dataSource = new MatTableDataSource();
  approvalNotification: TopicApprovalModel = {};
  value = '';
  topicStudent: TopicStudentModel = {};
  academic: UserAcademicModel = {};
  denunciation: TopicDenunciationModel = {};
  proposal: TopicProposalModel = {};
  role: String | null;
  haveTopic = false;
  haveNotification = false;
  haveDenunciation = false;
  haveProposal = false;

  constructor(
    private spinnerService: SpinnerService,
    private topicService: TopicService,
    public dialog: MatDialog,
    private topicStudentSvr: TopicStudentService,
    private approvalNotificationSrv: TopicApprovalService,
    private denunciationSvr: TopicDenunciationService,
    private proposalSvr: TopicProposalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.getDataUser();
    if (this.role === 'STUDENT') {
      this.onFindTopicbyStudent();
      this.getApprovalNotificationByStudent();
      this.getDenunciationByStudent();
      this.getProposalByStudent();
    }
  }

  onFindTopicbyStudent() {
    this.topicStudentSvr.getTopicStudentByStudentId().subscribe((data) => {
      this.haveTopic = true;
      this.topicStudent = data;
    });
  }

  getApprovalNotificationByStudent() {
    this.approvalNotificationSrv
      .getTopicNotificationByStudent()
      .subscribe((data) => {
        this.approvalNotification = data;
        this.haveNotification = true;
      });
  }

  getDenunciationByStudent() {
    this.denunciationSvr.getTopicDenunciationByStudentId().subscribe((data) => {
      this.denunciation = data;
      this.haveDenunciation = true;
    });
  }

  getProposalByStudent() {
    this.proposalSvr.getTopicProposalByStudent().subscribe((data) => {
      this.proposal = data;
      this.haveProposal = true;
    });
  }

  openDialog(id: string | null) {
    const dialogRef = this.dialog.open(AddTopicComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.sync();
      this.spinnerService.hide();
    });
  }

  openDialogTopic(id: string | null) {
    this.dialog.open(DialogTopicComponent, {
      data: id,
    });
  }

  openConfirmChangeTopic() {
    this.dialog.open(ChangeTopicComponent);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDataUser() {
    this.authService.profileUser().subscribe((data) => {
      this.academic = data;
      this.sync();
    });
  }

  sync() {
    if (this.academic.career?.id) {
      this.topicService
        .getTopicsByCareer(this.academic.career?.id)
        .subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
        });
    } else {
      this.topicService.getTopicsByStatus().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }

  chooseTopic(id: string) {
    let topicStudent = Object.assign({ topic: {id: id}, student: this.academic });
    this.topicStudentSvr.assigmentTopic(topicStudent).subscribe((data) => {
      this.topicStudent = data;
      this.onFindTopicbyStudent();
    });
  }

  onDeleteTopic(id: string): void {
    this.topicService.deleteTopic(id).subscribe((data) => {
      this.dataSource.data = data;
      this.sync();
    });
  }
}

@Component({
  selector: 'dialog-topic',
  templateUrl: './dialog-topic.component.html',
  styleUrls: ['./topic-banck.component.css'],
})
export class DialogTopicComponent {
  public topic: TopicModel;

  constructor(
    private topicService: TopicService,
    private spinnerService: SpinnerService,
    public dialogRef: MatDialogRef<DialogTopicComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) {}

  ngOnInit(): void {
    this.sync();
    this.spinnerService.hide();
  }

  sync(): void {
    if (this.id !== null)
      this.topicService.getTopicById(this.id).subscribe((data) => {
        this.topic = data;
      });
  }
}

@Component({
  selector: 'change-topic',
  styleUrls: ['./topic-banck.component.css'],
  templateUrl: './change-topic.component.html',
})
export class ChangeTopicComponent implements OnInit {
  topicStudent: TopicStudentModel = {};

  constructor(
    public dialogRef: MatDialogRef<ChangeTopicComponent>,
    private spinnerService: SpinnerService,
    private topicStudentService: TopicStudentService
  ) {}

  ngOnInit() {
    this.spinnerService.hide();
    this.OnTopicStudentByStudentId();
  }

  OnTopicStudentByStudentId() {
    this.topicStudentService.getTopicStudentByStudentId().subscribe((data) => {
      this.topicStudent = data;
    });
  }

  onDeleteAssignment() {
    if (this.topicStudent?.id)
      this.topicStudentService
        .deleteAssigment(this.topicStudent?.id)
        .subscribe((data) => {
          window.location.reload();
          this.dialogRef.close();
        });
  }
}
