import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import { TopicApprovalModel } from 'src/app/models/topic-approval-model';
import { TopicEvaluation, TopicStudentModel } from 'src/app/models/topic-student-model';
import { TopicApprovalService } from 'src/app/services/topic-approval.service';

@Component({
  selector: 'app-topic-notification-read',
  templateUrl: './topic-notification-read.component.html',
  styleUrls: ['../topic-notification.component.css'],
})
export class TopicNotificationReadComponent implements OnInit {
  static END_POINT = 'topic-approval/read/:id';
  public topicNotification: TopicApprovalModel;
  public topicStudent: TopicStudentModel;
  public evaluations = TopicEvaluation;
  private readonly id: string | null;


  monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  year = new Date().getFullYear();
  monthNumber = new Date().getMonth();
  month = this.monthNames[this.monthNumber];
  now = Date.now();
  day = new Date(this.now).getDate();

  constructor(
    private notificationApprovalSrv: TopicApprovalService,
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  print(elementPrint: string) {
    let printContent = document.getElementById(elementPrint);
    let WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    if(printContent) WindowPrt?.document.write(printContent.innerHTML);
    WindowPrt?.document.close();
    WindowPrt?.focus();
    WindowPrt?.print();
    WindowPrt?.close();
  }

  @ViewChild('notification', {static: false}) el!: ElementRef;

  makePdf() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("notification.pdf");
      }
    })
  }

  ngOnInit(): void {
    this.sync();
  }

  sync(): void {
    if (this.id !== null)
      this.notificationApprovalSrv
        .getTopicNotificationById(this.id)
        .subscribe((data) => {
          this.topicNotification = data;
        });
  }
}
