import { TopicProposalService } from 'src/app/services/topic-proposal.service';
import { TopicStudentModel } from 'src/app/models/topic-student-model';
import { Router } from '@angular/router';
import { TopicProposalModel } from './../../models/topic-proposal-model';
import { TopicStudentService } from 'src/app/services/topic-student.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topic-proposal',
  templateUrl: './topic-proposal.component.html',
  styleUrls: ['./topic-proposal.component.css'],
})
export class TopicProposalComponent implements OnInit {
  static END_POINT = 'topic-proposal';
  public topicStudent: TopicStudentModel = {};
  public proposalM: TopicProposalModel;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private topicProposalSrv: TopicProposalService,
    private topicStudentSvr: TopicStudentService) {
    this.topicStudentSvr.getTopicStudentByStudentId().subscribe((data) => {
      this.topicStudent = data;
    });
  }

  proposalForm = this.formBuilder.group({
    objectives: ['', Validators.required],
    studyJustification: ['', Validators.required],
    topicDescription: ['', Validators.required],
  });

  ngOnInit(): void {

  }

  onCancel() {
    this.proposalForm.reset();
    this.router.navigate(['']);
  }

  onCreateProposal() {
    if (this.proposalForm.valid) {
      let proposal = Object.assign(this.proposalForm.value, { topicStudent: this.topicStudent })
      this.topicProposalSrv.createProposal(proposal).subscribe(
        data => {
          alert("La propuesta de tema ha sido enviada")
        }
      )
    }
  }

}
