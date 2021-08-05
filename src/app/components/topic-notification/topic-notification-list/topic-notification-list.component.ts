import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { UserAcademicModel } from './../../../models/user-model';
import { MatTableDataSource } from '@angular/material/table';
import { TopicApprovalService } from 'src/app/services/topic-approval.service';

@Component({
  selector: 'app-topic-notification-list',
  templateUrl: './topic-notification-list.component.html',
  styleUrls: ['./topic-notification-list.component.css'],
})
export class TopicNotificationListComponent implements OnInit {
  dataApprovalNotification = new MatTableDataSource();
  static END_POINT = 'topic-approval';
  role: String | null;
  academic: UserAcademicModel = {};

  constructor(
    private authService: AuthService,
    private topicApprovalService: TopicApprovalService,
  ) {
    this.sync();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataApprovalNotification.filter = filterValue.trim().toLowerCase();
    console.log(this.dataApprovalNotification);
  }
  ngOnInit(): void {
    this.getDataUser();
  }

  getDataUser() {
    this.authService.profileUser().subscribe(
      data => {
        this.academic = data;
        this.sync();
      }
    );
  }

  sync() {
    if (this.academic.career?.id)
    this.topicApprovalService.getTopicApprovalsByCareer(this.academic.career?.id).subscribe((data) => {
      this.dataApprovalNotification = new MatTableDataSource(data);
      console.log(data)
    });
  }

  onDeleteNotification(id: string): void {
    this.topicApprovalService.deleteNotification(id).subscribe((data) => {
      this.dataApprovalNotification.data = data;
      this.sync();
    });
  }
}
