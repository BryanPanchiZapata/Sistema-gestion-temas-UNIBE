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

@Component({
  selector: 'app-executing-topic',
  templateUrl: './executing-topic.component.html',
  styleUrls: ['./executing-topic.component.css'],
})
export class ExecutingTopicComponent implements AfterViewInit {
<<<<<<< HEAD
=======
  academic: UserAcademicModel = {};
>>>>>>> mirelly
  dataStudent = new MatTableDataSource();

  constructor(
    private topicStudentService: TopicStudentService,
    public topicService: TopicService,
    public dialog: MatDialog,
<<<<<<< HEAD
    private route: Router
  ) {
    this.topicStudentService.getAllTopicStudent().subscribe((data) => {
      this.dataStudent.data = data;
    });
=======
    private authServices: AuthService
  ) {
  }

  ngOnInit(): void {
    this.dataStudent.paginator = this.paginator;
    this.getDataUser();
  }


  getDataUser() {
    this.authServices.profileUser().subscribe(
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
          this.dataStudent = data
        }
      )
    } else {
      this.topicStudentService
        .getTopicsByStatus('En ejecución')
        .subscribe(data => {
          this.dataStudent = data
        });
    }
>>>>>>> mirelly
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

    if (this.dataStudent.paginator) {
      this.dataStudent.paginator.firstPage();
    }
  }
<<<<<<< HEAD
  ngOnInit(): void {
    this.dataStudent.paginator = this.paginator;
    this.syncStatus();
  }

  syncStatus(): void {
    this.topicStudentService
      .getTopicsByStatus('En ejecución')
      .subscribe((data) => (this.dataStudent = data));
  }
=======
>>>>>>> mirelly
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