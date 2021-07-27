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

@Component({
  selector: 'app-topic-banck',
  styleUrls: ['./topic-banck.component.css'],
  templateUrl: './topic-banck.component.html',
})
export class TopicBanckComponent implements AfterViewInit, OnInit {
  dataSource = new MatTableDataSource();
  expression: boolean = false;

  constructor(
    private spinnerService: SpinnerService,
    private topicService: TopicService,
    public dialog: MatDialog
  ) { }

  openDialog(id: string | null) {
    const dialogRef = this.dialog.open(AddTopicComponent, {
      data: id
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
    this.spinnerService.hide();
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
    this.sync();
  }

  sync(): void {
    this.topicService
      .getTopicsByStatus('Disponible')
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
    public dialogRef: MatDialogRef<DialogTopicComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) { }

  ngOnInit(): void {
    this.sync();
  }

  sync(): void {
    if (this.id !== null)
      this.topicService
        .getTopicById(this.id)
        .subscribe(
          data => {
            this.topic = data
          });
  }
}
