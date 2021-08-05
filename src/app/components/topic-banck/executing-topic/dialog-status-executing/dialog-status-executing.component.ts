import { AuthService } from '../../../../services/auth.service';
import { TopicProposalService } from '../../../../services/topic-proposal.service';
import { TopicDenunciationService } from '../../../../services/topic-denunciation.service';
import { TopicApprovalService } from '../../../../services/topic-approval.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpinnerService } from '../../../../services/spinner.service';
import { TopicStudentService } from '../../../../services/topic-student.service';
import { TopicProposalModel } from '../../../../models/topic-proposal-model';
import { TopicDenunciationModel } from '../../../../models/topic-denunciation-model';
import { TopicApprovalModel } from '../../../../models/topic-approval-model';
import { TopicStudentModel } from '../../../../models/topic-student-model';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'dialog-status-executing',
  templateUrl: './dialog-status-executing.component.html',
  styleUrls: ['../executing-topic.component.css'],
})
export class DialogStatusExecutingComponent {
  public topicStudent: TopicStudentModel;
  approvalNotification: TopicApprovalModel = {};
  role: string | null;
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
    private authService: AuthService,
    private denunciationSvr: TopicDenunciationService,
    private proposalSvr: TopicProposalService,
  ) { }

  ngOnInit(): void {
    this.sync();
    this.role = this.authService.getRole();
    this.spinnerService.hide();
  }

  sync(): void {
    if (this.id !== null)
      this.topicService
        .getTopicStudentById(this.id)
        .subscribe(
          data => {
            this.topicStudent = data;
            this.getApprovalNotificationById();
            this.getDenunciationById();
            this.getProposalById();
          }
        );
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
