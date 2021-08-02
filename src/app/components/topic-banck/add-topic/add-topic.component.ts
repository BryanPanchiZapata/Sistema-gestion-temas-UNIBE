import { UserAcademicModel } from './../../../models/user-model';
import { AuthService } from './../../../services/auth.service';
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
  academic: UserAcademicModel = {};
  matcher = new MyErrorStateMatcher();


  constructor(
    private formBuilder: FormBuilder,
    private careerService: CareerService,
    private topicService: TopicService,
    private spinnerService: SpinnerService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<AddTopicComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string,
  ) {
  }

  ngOnInit(): void {
    this.getDataUser();
    this.sync()
    this.spinnerService.hide();
  }

  getDataUser() {
    this.authService.profileUser().subscribe(
      data => {
        this.academic = data;
      }
    );
  }

  onResetForm() {
    this.topicForm.reset();
  }

  topicForm = this.formBuilder.group({
    name: ['', Validators.required],
    articulation: ['', Validators.required],
    description: ['', Validators.required],
  });

  private initialValuesTopic(topic: TopicModel): void {
    this.topicForm.patchValue({
      name: topic.name,
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
            this.spinnerService.hide();
            this.dialogRef.close();
          }
        );
      } else {
        let topic = Object.assign(this.topicForm.value, {career: this.academic.career})
        console.log(topic);

        this.topicService.addTopic(topic).subscribe(
          data => {
            this.topic = data
            this.onResetForm();
            this.dialogRef.close();
            this.spinnerService.hide();
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
