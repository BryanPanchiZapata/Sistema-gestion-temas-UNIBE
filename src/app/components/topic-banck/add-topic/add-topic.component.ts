import { SpinnerService } from './../../../services/spinner.service';
import { Articulation } from './../../../models/topic-model';
import { TopicService } from 'src/app/services/topic.service';
import { MyErrorStateMatcher } from './../../../MyErrorStateMatcher';
import { CareerService } from './../../../services/career.service';
import { CareerModel } from './../../../models/career-model';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.css']
})
export class AddTopicComponent implements OnInit {
  response: any = [];
  careers: CareerModel[];
  articulations = Articulation;
  matcher = new MyErrorStateMatcher();


  constructor(
    private formBuilder: FormBuilder,
    private careerService: CareerService,
    private topicService: TopicService,
    private spinnerService: SpinnerService
    ) {
  }

  ngOnInit(): void {
    this.careerService.getAllCareers().subscribe(
      data => {
        this.careers = data;
      }
    );
    this.spinnerService.hide();

  }

  onResetForm() {
    this.topicForm.reset();
  }

  refresh(): void {
    window.location.reload();
  }

  topicForm = this.formBuilder.group({
    name: ['', Validators.required],
    career: ['', Validators.required],
    articulation: ['', Validators.required],
    description: ['', Validators.required],
  });

  onAddTopic() {
    if (this.topicForm.valid) {
      this.topicService.addTopic(this.topicForm.value).subscribe(
        data => {
          this.onResetForm();
          this.refresh();
        }
      )
    }
  }
}
