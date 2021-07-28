import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicDenunciationModel } from 'src/app/models/topic-denunciation-model';
import { TopicStudentModel } from 'src/app/models/topic-student-model';
import { TopicDenunciationService } from 'src/app/services/topic-denunciation.service';


@Component({
  selector: 'app-topic-denunciation-read',
  templateUrl: './topic-denunciation-read.component.html',
  styleUrls: ['../topic-denunciation.component.css'],
})
export class TopicDenunciationReadComponent implements OnInit {
  static END_POINT = 'topic-denunciation/read/:id';
  private readonly id: string | null;
  public denunciation: TopicDenunciationModel;
  public topicStudent: TopicStudentModel;
  private router: Router;
  constructor(
    private denunciationSrv: TopicDenunciationService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  year = new Date().getFullYear();
  monthNumber = new Date().getMonth();
  month = this.monthNames[this.monthNumber];
  day = new Date().getDate();

  ngOnInit(): void {
    this.sync();
  }

  sync(): void {
    if (this.id !== null)
      this.denunciationSrv
        .getTopicDenunciationById(this.id)
        .subscribe((data) => {
          this.denunciation = data;
        });
  }
}
