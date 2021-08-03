import { UserAcademicModel } from './../../models/user-model';
import { AuthService } from './../../services/auth.service';
import { TopicStudentModel } from 'src/app/models/topic-student-model';
import { TopicStudentService } from 'src/app/services/topic-student.service';
import {
  AfterViewInit,
  Component,
  Inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TopicService } from 'src/app/services/topic.service';
import { TopicModel } from 'src/app/models/topic-model';
import { SpinnerService } from 'src/app/services/spinner.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-topic-banck',
  styleUrls: ['./topic-banck.component.css'],
  templateUrl: './topic-banck.component.html',
})
export class TopicBanckComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'position',
    'tema',
    'articulacion',
    'carrera',
    'accion',
  ];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  topic: TopicStudentModel[] = [];
  dataSource: MatTableDataSource<TopicStudentModel[]>;
  topicStudent: TopicStudentModel = {};
  academic: UserAcademicModel = {};
  role: String | null;

  constructor(
    private spinnerService: SpinnerService,
    private topicService: TopicService,
    public dialog: MatDialog,
    private topicStudentSvr: TopicStudentService,
    private authService: AuthService
  ) {}
  filterPost = '';

  openDialog(id: string | null) {
    const dialogRef = this.dialog.open(AddTopicComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.sync();
      this.spinnerService.hide();
    });
  }

  openDialogTopic(id: string | null) {
    this.dialog.open(DialogTopicComponent, {
      data: id,
    });
  }

  openConfirmChangeTopic() {
    this.dialog.open(ChangeTopicComponent);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.getDataUser();
  }

  getDataUser() {
    this.authService.profileUser().subscribe((data) => {
      this.academic = data;
      this.sync();
    });
  }

  sync() {
    if (this.academic.career?.id) {
      this.topicService
        .getTopicsByCareer(this.academic.career?.id)
        .subscribe((data) => {
          this.dataSource = data;
        });
    } else {
      this.topicService.getTopicsByStatus().subscribe((data) => {
        this.dataSource = data;
      });
    }
  }

  chooseTopic(topic: TopicModel) {
    let topicStudent = Object.assign({ topic: topic, student: this.academic });
    this.topicStudentSvr.assigmentTopic(topicStudent).subscribe((data) => {
      this.topicStudent = data;
      this.sync();
    });
  }

  onDeleteTopic(id: string): void {
    this.topicService.deleteTopic(id).subscribe((data) => {
      this.dataSource.data = data;
      this.sync();
    });
  }
}

@Component({
  selector: 'dialog-topic',
  templateUrl: './dialog-topic.component.html',
  styleUrls: ['./topic-banck.component.css'],
})
export class DialogTopicComponent {
  public topic: TopicModel;

  constructor(
    private topicService: TopicService,
    private spinnerService: SpinnerService,
    public dialogRef: MatDialogRef<DialogTopicComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) {}

  ngOnInit(): void {
    this.sync();
    this.spinnerService.hide();
  }

  sync(): void {
    if (this.id !== null)
      this.topicService.getTopicById(this.id).subscribe((data) => {
        this.topic = data;
      });
  }
}
@Component({
  selector: 'change-topic',
  styleUrls: ['./topic-banck.component.css'],
  templateUrl: './change-topic.component.html',
})
export class ChangeTopicComponent implements OnInit {
  academic: UserAcademicModel = {};

  constructor(
    public dialogRef: MatDialogRef<ChangeTopicComponent>,
    private authService: AuthService,
    private spinnerService: SpinnerService
  ) {}

  // onCancel() {
  //   this.dialogRef.close();
  // }

  ngOnInit() {
    this.getDataUser();
    console.log(this.academic);
    this.spinnerService.hide();
  }

  getDataUser() {
    this.authService.profileUser().subscribe((data) => {
      this.academic = data;
    });
  }

  deleteAssignment() {}
}
