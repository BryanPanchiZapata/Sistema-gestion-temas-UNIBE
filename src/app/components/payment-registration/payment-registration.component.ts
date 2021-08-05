import { TopicStudentService } from 'src/app/services/topic-student.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payment-registration',
  templateUrl: './payment-registration.component.html',
  styleUrls: ['./payment-registration.component.css'],
})
export class PaymentRegistrationComponent implements OnInit {
  static END_POINT = 'payment-registration';

  dataSource: MatTableDataSource<DataTransfer>;

  displayedColumns: string[] = [
    'position',
    'cedula',
    'estudiante',
    'carrera',
    'estado',
  ];

  constructor(private topicStudentSvr: TopicStudentService) {}

  sync() {
    this.topicStudentSvr.getTopicToPayment().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  ngOnInit() {
    this.sync();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  paymentdenunciation(ciStudent: string) {
    this.topicStudentSvr
      .paymentDenunciation(ciStudent, 'Pagado')
      .subscribe((data) => {
        this.sync();
      });
  }
}
