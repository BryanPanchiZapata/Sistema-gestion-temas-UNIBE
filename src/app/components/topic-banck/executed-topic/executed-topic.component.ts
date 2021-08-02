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
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-executed-topic',
  templateUrl: './executed-topic.component.html',
  styleUrls: ['./executed-topic.component.css'],
})
export class ExecutedTopicComponent implements AfterViewInit {
  dataStudent = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private topicStudentService: TopicStudentService,
    public topicService: TopicService,
    public dialog: MatDialog,
    private route: Router
  ) {
    this.topicStudentService.getAllTopicStudent().subscribe((data) => {
      this.dataStudent.data = data;
    });
  }
  openDialogTopicStudentAssigned(id: string | null) {
    this.dialog.open(DialogStatusAssignedComponent, {
      data: id,
    });
  }
  navigateToTopic(topic: TopicStudentModel): void {
    this.route.navigate(['/topicStudent/' + topic.id]);
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
  ngOnInit(): void {
    this.dataStudent.paginator = this.paginator;
    this.syncStatus();
  }

  syncStatus(): void {
    this.topicStudentService
      .getTopicsByStatus('Ejecutado')
      .subscribe((data) => (this.dataStudent = data));
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
  ) {}

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
