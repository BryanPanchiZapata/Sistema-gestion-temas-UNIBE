import { TopicDenunciationModel } from 'src/app/models/topic-denunciation-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicStudentService } from 'src/app/services/topic-student.service';
import { TopicStudentModel } from 'src/app/models/topic-student-model';


interface Proyecto {
  value: string;
  viewValue: string;
}

interface Investigacion {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-topic-denunciation',
  templateUrl: './topic-denunciation.component.html',
  styleUrls: ['./topic-denunciation.component.css'],
})
export class TopicDenunciationComponent implements OnInit {
  static END_POINT = 'topic-denunciation/:id';
  private readonly id: string | null;
  public denunciation: TopicDenunciationModel;
  public topicStudent: TopicStudentModel = {};

  constructor(
    private topicStudentService: TopicStudentService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.sync();
  }

  sync(): void {
    if (this.id !== null)
    this.topicStudentService.getTopicStudentById(this.id).subscribe(
      data => {
        this.topicStudent = data;
      }
    );
  }
  today = Date.now();
  fixedTimezone = this.today;
}
