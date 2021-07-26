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
import { TopicModel, TopicStatus } from 'src/app/models/topic-model';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-topic-banck',
  styleUrls: ['./topic-banck.component.css'],
  templateUrl: './topic-banck.component.html',
})
export class TopicBanckComponent implements AfterViewInit, OnInit {
  dataSource = new MatTableDataSource();
  expression : boolean = false;
  constructor(
    private topicService: TopicService,
    public dialog: MatDialog,
    private route: Router
  ) {}

  openDialog(id: string | null) {
    const dialogRef = this.dialog.open(AddTopicComponent, {
      data: id,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.sync();
    });
  }

  openDialogTopic(id: string | null) {
    this.dialog.open(DialogTopicComponent, {
      data: id,
    });
  }
  navigateToTopic(topic: TopicModel): void {
    this.route.navigate(['/topic/' + topic.id]);
  }
  sync() {
    this.topicService.getAllTopic().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  displayedColumns: string[] = [
    'position',
    'tema',
    'articulacion',
    'estado',
    'carrera',
    'accion',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.syncStatus();
  }

  syncStatus(): void {
    this.topicService
      .getTopicsByStatus('DISPONIBLE')
      .subscribe((data) => (this.dataSource = data));
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
  }

  sync(): void {
    if (this.id !== null)
      this.topicService
        .getTopicById(this.id)
        .subscribe((data) => (this.topic = data));
  }
}
