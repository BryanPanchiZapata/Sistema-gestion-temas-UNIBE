import { AuthService } from './../../../services/auth.service';
import { UserAcademicModel } from './../../../models/user-model';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TopicStudentModel } from 'src/app/models/topic-student-model';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TopicStudentService } from 'src/app/services/topic-student.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-executing-topic',
  templateUrl: './executing-topic.component.html',
  styleUrls: ['./executing-topic.component.css'],
})
export class ExecutingTopicComponent implements AfterViewInit {
  dataStudent = new MatTableDataSource();
  academic: UserAcademicModel = {};

  constructor(
    private topicStudentService: TopicStudentService,
    public dialog: MatDialog,
    private authServices: AuthService
  ) {  }

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

    if (this.dataStudent.paginator) {
      this.dataStudent.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.dataStudent.paginator = this.paginator;
    this.getDataUser();
    this.sync();
  }

  getDataUser() {
    this.authServices.profileUser().subscribe(
      data => {
        this.academic = data;
      }
    );
  }

  sync() {
    console.log(this.academic.career?.id);
    if(this.academic.career?.id){
      this.topicStudentService.getTopicStudentsByCareer(this.academic.career?.id, 'En ejecución')
    }
    this.topicStudentService
      .getTopicsByStatus('En ejecución')
      .subscribe(data => {
        this.dataStudent = data
      });
  }
}

@Component({
  selector: 'dialog-status-executing',
  templateUrl: './dialog-status-executing.component.html',
  styleUrls: ['./executing-topic.component.css'],
})
export class DialogStatusExecutingComponent {
  public topicStudent: TopicStudentModel;

  constructor(
    private topicService: TopicStudentService,
    private spinnerService: SpinnerService,
    public dialogRef: MatDialogRef<DialogStatusExecutingComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) {}

  ngOnInit(): void {
    this.sync();
    this.spinnerService.hide();
  }

  sync(): void {
    if (this.id !== null)
      this.topicService
        .getTopicStudentById(this.id)
        .subscribe((data) => (this.topicStudent = data));
  }
}
