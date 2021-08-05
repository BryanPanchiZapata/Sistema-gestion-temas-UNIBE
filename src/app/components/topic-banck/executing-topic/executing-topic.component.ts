import { TopicModel } from 'src/app/models/topic-model';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TopicStudentModel } from 'src/app/models/topic-student-model';
import { UserAcademicModel } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import { TopicStudentService } from 'src/app/services/topic-student.service';
import { TopicService } from 'src/app/services/topic.service';
import { DialogStatusExecutingComponent } from './dialog-status-executing/dialog-status-executing.component';

@Component({
  selector: 'app-executing-topic',
  templateUrl: './executing-topic.component.html',
  styleUrls: ['./executing-topic.component.css'],
})
export class ExecutingTopicComponent implements AfterViewInit {
  role: string | null;
  academic: UserAcademicModel = {};
  topicStudent: TopicStudentModel = {};
  haveTopic = false;
  dataStudent = new MatTableDataSource();

  constructor(
    private topicStudentService: TopicStudentService,
    public topicService: TopicService,
    public dialog: MatDialog,
    private authService: AuthService,
    private topicStudentSvr: TopicStudentService
  ) {
  }

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.dataStudent.paginator = this.paginator;
    this.getDataUser();
    if (this.role === "STUDENT") {
      this.onFindTopicbyStudent();
    }
  }

  onFindTopicbyStudent() {
    this.topicStudentSvr.getTopicStudentByStudentId().subscribe(
      data => {
        this.topicStudent = data;
        this.haveTopic = true;
      }
    )
  }

  chooseTopic(topic: TopicModel) {
    let topicStudent = Object.assign({ topic: topic, student: this.academic });
    this.topicStudentSvr.assigmentTopic(topicStudent).subscribe(
      data => {
        this.topicStudent = data;
        this.onFindTopicbyStudent();
        window.location.reload();
      }
    )
  }

  getDataUser() {
    this.authService.profileUser().subscribe(
      data => {
        this.academic = data;
        this.sync();
      }
    );
  }

  sync() {
    if (this.academic.career?.id) {
      this.topicStudentService.getTopicStudentsByCareer(this.academic.career?.id, "En ejecución").subscribe(
        data => {
          this.dataStudent = new MatTableDataSource(data);
        }
      )
    } else {
      this.topicStudentService
        .getTopicsByStatus('En ejecución')
        .subscribe(data => {
          this.dataStudent = new MatTableDataSource(data);
        });
    }
  }

  openDialogTopicStudentExecuting(id: string | null) {
    this.dialog.open(DialogStatusExecutingComponent, {
      data: id,
    });
  }

  displayedColumns: string[] = [
    'position',
    'tema',
    'articulacion',
    'pago',
    'cedula',
    'carrera',
    'fecha',
    'evaluacion',
    'accion'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataStudent.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataStudent.filter = filterValue.trim().toLowerCase();
  }

  onChangeToExecuted(id: string) {
    this.topicService.changeToExecuted(id).subscribe(
      data => {
        this.sync();
        window.location.reload();
      }
    )
  }
}

