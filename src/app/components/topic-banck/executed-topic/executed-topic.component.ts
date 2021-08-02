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
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-executed-topic',
  templateUrl: './executed-topic.component.html',
  styleUrls: ['./executed-topic.component.css'],
})
export class ExecutedTopicComponent implements AfterViewInit {
  dataStudent = new MatTableDataSource();
  academic: UserAcademicModel = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private topicStudentService: TopicStudentService,
    public dialog: MatDialog,
    private route: Router,
    private authServices: AuthService
  ) { }

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
      this.topicStudentService.getTopicStudentsByCareer(this.academic.career?.id, "Ejecutado")
    } else {
      this.topicStudentService
        .getTopicsByStatus('Ejecutado')
        .subscribe(data => {
          this.dataStudent = data
        });
    }
  }

  openDialogTopicStudentAssigned(id: string | null) {
    this.dialog.open(DialogStatusAssignedComponent, {
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


  ngAfterViewInit() {
    this.dataStudent.paginator = this.paginator;
    this.dataStudent.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataStudent.filter = filterValue.trim().toLowerCase();

    if (this.dataStudent.paginator) {
      this.dataStudent.paginator.firstPage();
    }
  }
}

@Component({
  selector: 'dialog-status-assigned',
  templateUrl: './dialog-status-assigned.component.html',
  styleUrls: ['./executed-topic.component.css'],
})
export class DialogStatusAssignedComponent {
  public topicStudent: TopicStudentModel;

  constructor(
    private topicService: TopicStudentService,
    private spinnerService: SpinnerService,
    public dialogRef: MatDialogRef<DialogStatusAssignedComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) { }

  ngOnInit(): void {
    this.synch();
    this.spinnerService.hide();
  }

  synch(): void {
    if (this.id !== null)
      this.topicService
        .getTopicStudentById(this.id)
        .subscribe((data) => (this.topicStudent = data));
  }
}
