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

  displayedColumns: string[] = ['position', 'cedula', 'estudiante', 'carrera', 'estado'];
  @ViewChild(MatPaginator, { static: false}) paginator: MatPaginator;
  constructor(private topicStudentSvr: TopicStudentService) {
  }

  sync() {
    this.topicStudentSvr.getTopicsByStatus("En ejecución").subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  ngOnInit() {
    this.sync();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue)
  }


  paymentdenunciation(ciStudent: string) {
    this.topicStudentSvr.paymentDenunciation(ciStudent, "Pagado").subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
