import { UserAcademicModel } from './../../models/user-model';
import { AcademicUserService } from './../../services/academic-user.service';
import { TopicDenunciationService } from './../../services/topic-denunciation.service';
import { SemesterLevel, InvestigationModality, ProjectType, InvestigationLine } from './../../models/topic-denunciation-model';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { TopicDenunciationModel } from 'src/app/models/topic-denunciation-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  static END_POINT = 'topic-denunciation';
  public denunciation: TopicDenunciationModel;
  public topicStudent: TopicStudentModel = {};
  public semesterLevels = SemesterLevel;
  public investigationModalitys = InvestigationModality;
  public projectTypes = ProjectType;
  public investigationLine = InvestigationLine;
  public academicUser: UserAcademicModel = {};

  constructor(
    private topicStudentService: TopicStudentService,
    private formBuilder: FormBuilder,
    private topicDenunciationSvr: TopicDenunciationService,
    private router: Router,
    private academicSvr: AcademicUserService
  ) {
  }

  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  year = new Date().getFullYear();
  monthNumber = new Date().getMonth();
  month = this.monthNames[this.monthNumber]
  day = new Date().getDate();

  denunciationForm = this.formBuilder.group({
    investigationLine: ['', Validators.required],
    investigationModality: ['', Validators.required],
    projectType: ['', Validators.required],
    semesterLevel: ['', Validators.required],
    ciudad: ['', Validators.required],
    articulationTopic: ['', Validators.required],
  });

  ngOnInit(): void {
    this.sync();
  }

  sync(): void {
    this.topicStudentService.getTopicStudentByStudentId().subscribe(
      data => {
        this.topicStudent = data;
        this.onGetCareerDirector();
      }
    );
  }

  onGetCareerDirector() {
    if (this.topicStudent?.topic?.career?.id)
      this.academicSvr.getDirectorCareer(this.topicStudent?.topic?.career?.id).subscribe(
        data => {
          this.academicUser = data;
        }
      )
  }

  onCancel() {
    this.denunciationForm.reset();
    this.router.navigate(['']);
  }

  onCreateDenunciation() {
    if (this.denunciationForm.valid) {
      let denunciation = Object.assign(this.denunciationForm.value, { topicStudent: this.topicStudent })
      this.topicDenunciationSvr.createDenunciation(denunciation).subscribe(
        data => {
          this.denunciation = data;
          this.router.navigate(['/topic-denunciation/read/' + this.topicStudent.id])
          alert("La denuncia de tema ha sido enviada")
        }
      )
    }
  }
}
