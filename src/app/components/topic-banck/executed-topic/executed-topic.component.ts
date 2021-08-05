import { DialogStatusExecutedComponent } from './dialog-status-executed/dialog-status-executed.component';
import { AuthService } from './../../../services/auth.service';
import { UserAcademicModel } from './../../../models/user-model';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TopicStudentService } from 'src/app/services/topic-student.service';

@Component({
  selector: 'app-executed-topic',
  templateUrl: './executed-topic.component.html',
  styleUrls: ['./executed-topic.component.css'],
})
export class ExecutedTopicComponent implements AfterViewInit {
  dataStudent = new MatTableDataSource();
  academic: UserAcademicModel = {};

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private topicStudentService: TopicStudentService,
    public dialog: MatDialog,
    private authServices: AuthService
  ) {}

  ngOnInit(): void {
    this.dataStudent.paginator = this.paginator;
    this.getDataUser();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataStudent.filter = filterValue.trim().toLowerCase();
    console.log(this.dataStudent)
  }

  getDataUser() {
    this.authServices.profileUser().subscribe((data) => {
      this.academic = data;
      this.sync();
    });
  }

  sync() {
    if (this.academic.career?.id) {
      this.topicStudentService
        .getTopicStudentsByCareer(this.academic.career?.id, 'Ejecutado')
        .subscribe((data) => {
          this.dataStudent = new MatTableDataSource(data);
        });
    } else {
      this.topicStudentService
        .getTopicsByStatus('Ejecutado')
        .subscribe((data) => {
          this.dataStudent = new MatTableDataSource(data);
        });
    }
  }

  openDialogTopicStudentAssigned(id: string | null) {
    this.dialog.open(DialogStatusExecutedComponent, {
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
  ];

  ngAfterViewInit() {}
}
