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
  public proposal: TopicProposalModel = {}

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private topicStudentSvr: TopicStudentService) {
    // this.topicStudentSvr.getAllTopicStudent().subscribe((data) => {
    //   this.proposal = data;
    // });
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

  }

}
