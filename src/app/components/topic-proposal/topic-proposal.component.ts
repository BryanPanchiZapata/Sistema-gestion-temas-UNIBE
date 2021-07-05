import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topic-proposal',
  templateUrl: './topic-proposal.component.html',
  styleUrls: ['./topic-proposal.component.css']
})
export class TopicProposalComponent implements OnInit {
  static END_POINT = 'topic-proposal';
  constructor() { }

  ngOnInit(): void {
  }

}
