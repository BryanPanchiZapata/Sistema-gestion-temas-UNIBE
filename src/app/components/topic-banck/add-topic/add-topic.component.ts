import { TopicBanckComponent } from './../topic-banck.component';
import { SpinnerService } from './../../../services/spinner.service';
import { Articulation, TopicModel } from './../../../models/topic-model';
import { TopicService } from 'src/app/services/topic.service';
import { MyErrorStateMatcher } from './../../../MyErrorStateMatcher';
import { CareerService } from './../../../services/career.service';
import { CareerModel } from './../../../models/career-model';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.css']
})
export class AddTopicComponent implements OnInit {
  response: any = [];
  careers: CareerModel[];
  articulations = Articulation;
  topic: TopicModel = {};
  matcher = new MyErrorStateMatcher();


  constructor(
    private formBuilder: FormBuilder,
    private careerService: CareerService,
    private topicService: TopicService,
    private spinnerService: SpinnerService,
    public dialogRef: MatDialogRef<AddTopicComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string,
  ) {
  }

  ngOnInit(): void {
    this.careerService.getAllCareers().subscribe(
      data => {
        this.careers = data;
      }
    );
    this.spinnerService.hide();
    this.sync();

  }

  onResetForm() {
    this.topicForm.reset();
  }

  topicForm = this.formBuilder.group({
    name: ['', Validators.required],
    career: ['', Validators.required],
    articulation: ['', Validators.required],
    description: ['', Validators.required],
  });

  private initialValuesTopic(topic: TopicModel): void {
    this.topicForm.patchValue({
      name: topic.name,
      career: topic.career,
      articulation: topic.articulation,
      description: topic.description,
    })
  }

  onAddTopic() {
    if (this.topicForm.valid) {
      if (this.id !== null) {
        this.topicService.updateTopic(this.id, this.topicForm.value).subscribe(
          data => {
            this.topic = data
            this.onResetForm();
            this.dialogRef.close();
          }
        );
      } else {
        this.topicService.addTopic(this.topicForm.value).subscribe(
          data => {
            this.onResetForm();
            this.dialogRef.close();
          }
        )
      }
    }
  }

  sync() {
    if (this.id !== null) {
      this.topicService.getTopicById(this.id).subscribe(
        data => {
          this.topic = data;
          this.initialValuesTopic(this.topic);
        }
      )
    }
  }
}
