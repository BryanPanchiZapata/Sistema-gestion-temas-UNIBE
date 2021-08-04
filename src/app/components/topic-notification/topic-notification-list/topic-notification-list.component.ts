import {
  AfterViewInit,
  Component,
  Inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicApprovalService } from 'src/app/services/topic-approval.service';

@Component({
  selector: 'app-topic-notification-list',
  templateUrl: './topic-notification-list.component.html',
  styleUrls: ['./topic-notification-list.component.css'],
})
export class TopicNotificationListComponent implements AfterViewInit, OnInit {
  dataApprovalNotification = new MatTableDataSource();
  static END_POINT = 'topic-approval';
  constructor(
    private topicApprovalService: TopicApprovalService,
    private route: Router
  ) {
    this.topicApprovalService.getAllTopicApproval().subscribe((data) => {
      this.dataApprovalNotification = new MatTableDataSource(data);
    });
  }

  displayedColumns: string[] = [
    'Número_de_documento',
    'Cédula',
    'Nombre_del_Estudiante',
    'Carrera',
    'Tema',
    'Estado',
    'Evaluacion',
    'Observaciones',
    'Acciones',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataApprovalNotification.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataApprovalNotification.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.dataApprovalNotification.paginator = this.paginator;
  }

  onDeleteTopic(id: string): void {
    this.topicApprovalService.deleteTopic(id).subscribe((data) => {
      this.dataApprovalNotification.data = data;
    });
  }
}
