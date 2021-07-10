import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payment-registration',
  templateUrl: './payment-registration.component.html',
  styleUrls: ['./payment-registration.component.css']
})
export class PaymentRegistrationComponent implements AfterViewInit {
  static END_POINT = 'payment-registration';
  displayedColumns: string[] = ['position', 'cedula', 'estudiante', 'estado'];
  dataSource = new MatTableDataSource<TopicData>(ELEMENT_DATA);
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
}

export interface TopicData {
  position: number;
  cedula: number;
  estudiante: string;
}

const ELEMENT_DATA: TopicData[] = [
  {
    position: 1,
    cedula: 1726010786,
    estudiante: 'Maria Belen Canesas Caicedo',
    
  },
  {
    position: 2,
    cedula: 1726010786,
    estudiante: 'Maria Belen Canesas Caicedo',
    
  },
  {
    position: 3,
    cedula: 1726010786,
    estudiante: 'Maria Belen Canesas Caicedo',
    
  },
  {
    position: 4,
    cedula: 1726010786,
    estudiante: 'Maria Belen Canesas Caicedo',
    
  },
  {
    position: 5,
    cedula: 1726010786,
    estudiante: 'Maria Belen Canesas Caicedo',
    
  },

]
