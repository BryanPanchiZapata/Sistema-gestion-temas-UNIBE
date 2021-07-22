import { AddTopicComponent } from './add-topic/add-topic.component';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic-banck',
  styleUrls: ['./topic-banck.component.css'],
  templateUrl: './topic-banck.component.html',
})
export class TopicBanckComponent implements AfterViewInit {
  dataSource = new MatTableDataSource();

  constructor(private topicService: TopicService, public dialog: MatDialog) {
    this.topicService.getAllTopic().subscribe((data) => {
      this.dataSource.data = data;
    });
  }
  openDialog() {
    this.dialog.open(AddTopicComponent);
  }
  displayedColumns: string[] = [
    'position',
    'tema',
    'articulacion',
    'estado',
    'carrera',
    'evaluacion',
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
  }
}

@Component({
  selector: 'dialog-element',
  templateUrl: './dialog-element.component.html',
  styleUrls: ['./topic-banck.component.css'],
})
export class DialogElementComponent {}
