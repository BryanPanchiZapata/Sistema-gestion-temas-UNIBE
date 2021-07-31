import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topic-proposal',
  templateUrl: './topic-proposal.component.html',
  styleUrls: ['./topic-proposal.component.css'],
})
export class TopicProposalComponent implements OnInit {
  static END_POINT = 'topic-proposal';
  document: Document | null;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  proposalForm = this.formBuilder.group({
    objectives: ['', Validators.required],
    studyJustification: ['', Validators.required],
    topicDescription: ['', Validators.required],
  });
}
