import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-paid-registration',
  templateUrl: './paid-registration.component.html',
  styleUrls: ['./paid-registration.component.css']
})
export class PaidRegistrationComponent implements AfterViewInit {

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
