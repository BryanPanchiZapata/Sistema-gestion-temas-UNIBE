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
  static END_POINT = 'topic-denunciation/:id';
  private readonly id: string | null;
  public denunciation: TopicDenunciationModel;
  public topicStudent: TopicStudentModel = {};
  public semesterLevels = SemesterLevel;
  public investigationModalitys = InvestigationModality;
  public projectTypes = ProjectType;
  public investigationLine = InvestigationLine;

  constructor(
    private topicStudentService: TopicStudentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private topicDenunciationSvr: TopicDenunciationService,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
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
    if (this.id !== null)
      this.topicStudentService.getTopicStudentById(this.id).subscribe(
        data => {
          this.topicStudent = data;
        }
      );
  }

  print(elementPrint: string) {
    const printContent = document.getElementById(elementPrint);
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    if(printContent) WindowPrt?.document.write(printContent.innerHTML);
    WindowPrt?.document.close();
    WindowPrt?.focus();
    WindowPrt?.print();
    WindowPrt?.close();
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
          this.denunciation = data
          alert("La denuncia de tema ha sido enviada")
        }
      )
    }
  }
}
