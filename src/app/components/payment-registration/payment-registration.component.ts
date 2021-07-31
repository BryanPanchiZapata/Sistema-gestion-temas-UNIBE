import { TopicStudentService } from 'src/app/services/topic-student.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payment-registration',
  templateUrl: './payment-registration.component.html',
  styleUrls: ['./payment-registration.component.css'],
})
export class PaymentRegistrationComponent implements AfterViewInit, OnInit {
  static END_POINT = 'payment-registration';

  dataSource = new MatTableDataSource();

  constructor(private topicStudentSvr: TopicStudentService) {
  }

  sync() {
    this.topicStudentSvr.getAllTopicStudent().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngOnInit() {
    this.sync();
  }

  displayedColumns: string[] = ['position', 'cedula', 'estudiante', 'carrera', 'estado'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  paymentdenunciation(ciStudent: string) {
    this.topicStudentSvr.paymentDenunciation(ciStudent, "Pagado").subscribe(
      data => {
        this.sync();
      }
    )
  }

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
}
