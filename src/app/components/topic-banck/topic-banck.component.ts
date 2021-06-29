import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-topic-banck',
  styleUrls: ['./topic-banck.component.css'],
  templateUrl: './topic-banck.component.html',
})
export class TopicBanckComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'position',
    'tema',
    'articulacion',
    'estado',
    'carrera',
    'evaluacion',
    'accion',
  ];
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
  tema: string;
  articulacion: string;
  estado: string;
  carrera: string;
  evaluacion: string;
}

const ELEMENT_DATA: TopicData[] = [
  {
    position: 1,
    tema: 'Titulo proyecto',
    articulacion: 'Prácticas Laborales',
    estado: 'En ejecución',
    carrera: 'Software',
    evaluacion: 'Aprobado',
  },
  {
    position: 2,
    tema: 'Titulo proyecto',
    articulacion: 'Prácticas Laborales',
    estado: 'En ejecución',
    carrera: 'Software',
    evaluacion: 'Aprobado',
  },
  {
    position: 3,
    tema: 'Titulo proyecto',
    articulacion: 'Prácticas Laborales',
    estado: 'En ejecución',
    carrera: 'Software',
    evaluacion: 'Aprobado',
  },
  {
    position: 4,
    tema: 'Titulo proyecto',
    articulacion: 'Prácticas Laborales',
    estado: 'En ejecución',
    carrera: 'Software',
    evaluacion: 'Aprobado',
  },
  {
    position: 5,
    tema: 'Titulo proyecto',
    articulacion: 'Prácticas Laborales',
    estado: 'En ejecución',
    carrera: 'Software',
    evaluacion: 'Aprobado',
  },
  {
    position: 6,
    tema: 'Titulo proyecto',
    articulacion: 'Prácticas Laborales',
    estado: 'En ejecución',
    carrera: 'Software',
    evaluacion: 'Aprobado',
  },
  {
    position: 7,
    tema: 'Titulo proyecto',
    articulacion: 'Prácticas Laborales',
    estado: 'En ejecución',
    carrera: 'Software',
    evaluacion: 'Aprobado',
  },
  {
    position: 8,
    tema: 'Titulo proyecto',
    articulacion: 'Prácticas Laborales',
    estado: 'En ejecución',
    carrera: 'Software',
    evaluacion: 'Aprobado',
  },
  {
    position: 9,
    tema: 'Titulo proyecto',
    articulacion: 'Prácticas Laborales',
    estado: 'En ejecución',
    carrera: 'Software',
    evaluacion: 'Aprobado',
  },
  {
    position: 10,
    tema: 'Titulo proyecto',
    articulacion: 'Prácticas Laborales',
    estado: 'En ejecución',
    carrera: 'Software',
    evaluacion: 'Aprobado',
  },
];
