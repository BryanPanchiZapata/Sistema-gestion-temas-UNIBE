import { TopicProposalService } from 'src/app/services/topic-proposal.service';
import { TopicStudentModel } from 'src/app/models/topic-student-model';
import { Router } from '@angular/router';
import { TopicProposalModel } from './../../models/topic-proposal-model';
import { TopicStudentService } from 'src/app/services/topic-student.service';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-topic-proposal',
  templateUrl: './topic-proposal.component.html',
  styleUrls: ['./topic-proposal.component.css'],
})
export class TopicProposalComponent implements OnInit {
  static END_POINT = 'topic-proposal';
  public topicStudent: TopicStudentModel = {};
  public proposalM: TopicProposalModel = {};

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private topicProposalSrv: TopicProposalService,
    private topicStudentSvr: TopicStudentService) {
    this.topicStudentSvr.getTopicStudentByStudentId().subscribe((data) => {
      this.topicStudent = data;
    });
  }

  get objectivesSpecific() {
    return this.proposalForm.get('objectivesSpecific') as FormArray
  }

  proposalForm = this.formBuilder.group({
    objectiveGeneral: ['', Validators.required],
    objectivesSpecific: this.formBuilder.array([
      this.formBuilder.control('', [Validators.required])
    ]),
    studyJustification: ['', Validators.required],
    topicDescription: ['', Validators.required],
  });

  addObjectivesSpecific() {
    this.objectivesSpecific.push(this.formBuilder.control('', [Validators.required]));
  }

  removeObjectivesSpecific(indice: number) {
    this.objectivesSpecific.removeAt(indice);
  }

  ngOnInit(): void {
    this.sync();
  }

  sync() {
    this.topicStudentSvr.getTopicStudentByStudentId().subscribe(
      data => {
        this.topicStudent = data;
      }
    )
  }

  onCancel() {
    this.proposalForm.reset();
    this.objectivesSpecific.controls.splice(0, this.objectivesSpecific.length)
    this.router.navigate(['']);
  }

  onCreateProposal() {
    if (this.proposalForm.valid) {
      let proposal = Object.assign(this.proposalForm.value, { topicStudent: this.topicStudent })
      this.topicProposalSrv.createProposal(proposal).subscribe(
        data => {
          this.router.navigate(['topic-proposal/read/' + this.topicStudent.topic?.id])
          alert("La propuesta de tema ha sido enviada");
        }
      )
    }
  }

  countWords() {
    let texto = (<HTMLInputElement>document.getElementById('topicDescription')).value
    texto = texto.replace(/\r?\n/g, ' ');
    texto = texto.replace(/[ ]+/g, ' ');
    texto = texto.replace(/^ /, '');
    texto = texto.replace(/ $/, '');
    let textoTroceado = texto.split(' ');
    let numeroPalabras = textoTroceado.length;
    console.log(numeroPalabras);
  }

}
