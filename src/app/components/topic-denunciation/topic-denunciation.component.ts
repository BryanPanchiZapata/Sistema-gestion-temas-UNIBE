import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicStudentModel } from 'src/app/models/topic-student';
import { TopicStudentService } from 'src/app/services/topic-student.service';


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
  public denunciation: TopicStudentModel;
  router: any;

  proyectos: Proyecto[] = [
    { value: 'vinculación-0', viewValue: 'Vinculación' },
    { value: 'investigación-1', viewValue: 'Investigación' },
    { value: 'docencia-2', viewValue: 'Docencia' },
  ];

  investigaciones: Investigacion[] = [
    { value: 'emprendimiento-0', viewValue: 'Emprendimiento' },
    { value: 'modelo de negocio-1', viewValue: 'Modelo de negocio' },
    { value: 'examne-2', viewValue: 'Examen complexivo' },
    { value: 'producto-3', viewValue: 'Producto o presentación artística' },
    { value: 'propuesta-4', viewValue: 'Propuesta tecnológica ' },
    { value: 'proyecto-5', viewValue: 'Proyecto de investigación' },
  ];
  constructor(
    private topicStudentService: TopicStudentService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.synch();
  }

  synch(): void {
    if (this.id !== null)
      this.topicStudentService
        .getTopicStudentById(this.id)
        .subscribe((data) => (this.denunciation = data));
  }
  today = Date.now();
  fixedTimezone = this.today;
}
