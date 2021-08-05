import { AuthService } from './../../../services/auth.service';
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
  role: String | null;
  private readonly id: string | null;
  public proposal: TopicProposalModel = {};

  constructor(
    private proposalSrv: TopicProposalService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  print(elementPrint: string) {
    const printContent = document.getElementById(elementPrint);
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    if (printContent) WindowPrt?.document.write(printContent.innerHTML);
    WindowPrt?.document.close();
    WindowPrt?.focus();
    WindowPrt?.print();
    WindowPrt?.close();
  }

  ngOnInit(): void {
    this.sync();
    this.role = this.authService.getRole();
  }

  sync(): void {
    if (this.id !== null)
      this.proposalSrv
        .getTopicProposalById(this.id)
        .subscribe((data) => {
          this.proposal = data;
        });
  }

  onDeleteProposal() {
    if(this.proposal?.id)
    this.proposalSrv.deleteProposal(this.proposal?.id).subscribe(
      data => {
        this.router.navigate(['/'])
      }
    )
  }
}
