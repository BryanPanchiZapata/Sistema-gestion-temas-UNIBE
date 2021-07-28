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

  /* countWords() {
    const text = document.getElementById('count')?.innerText;
    text = text.replace(/\r\n/g, ' ');
    text = text.replace(/[ ]+/g, ' ');
    text = text.replace(/^ /, '');
    text = text.replace(/ $/, '');
    const textSpace = text?.split(' ');
    const number = textSpace?.length;
    alert(number);
    console.log(document);
    console.log(text1);
    console.log(textSpace);
  } */

  proposalForm = this.formBuilder.group({
    objectives: ['', Validators.required],
    studyJustification: ['', Validators.required],
    topicDescription: ['', Validators.required],
  });
}
