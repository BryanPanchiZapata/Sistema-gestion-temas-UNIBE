import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicProposalModel } from 'src/app/models/topic-proposal-model';
import { TopicProposalService } from 'src/app/services/topic-proposal.service';

@Component({
  selector: 'app-topic-proposal-read',
  templateUrl: './topic-proposal-read.component.html',
  styleUrls: ['../topic-proposal.component.css']
})
export class TopicProposalReadComponent implements OnInit {
  static END_POINT = 'topic-proposal/read/:id';
  private readonly id: string | null;
  public proposal: TopicProposalModel;
  private router: Router;
  constructor(
    private ProposalSrv: TopicProposalService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.sync();
  }

  sync(): void {
    if (this.id !== null)
      this.ProposalSrv
        .getTopicProposalById(this.id)
        .subscribe((data) => {
          this.proposal = data;
        });
  }

}
