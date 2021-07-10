import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-topic-student',
  templateUrl: './topic-student.component.html',
  styleUrls: ['./topic-student.component.css'],
})
export class TopicStudentComponent implements AfterViewInit {
  static END_POINT = 'topic-student';
  displayedColumns: string[] = ['position', 'tema', 'estado'];
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
  estado: string;
}

const ELEMENT_DATA: TopicData[] = [
  {
    position: 1,
    tema: 'Sistema web para la gestión de temas de titulación de la Universidad Iberoamericana del Ecuador',
    estado: 'En ejecución',
  },
  {
    position: 2,
    tema: 'Sistema web para la gestión de temas de titulación de la Universidad Iberoamericana del Ecuador',
    estado: 'En ejecución',
  },
  {
    position: 3,
    tema: 'Sistema web para la gestión de temas de titulación de la Universidad Iberoamericana del Ecuador',
    estado: 'En ejecución',
  },
  {
    position: 4,
    tema: 'Sistema web para la gestión de temas de titulación de la Universidad Iberoamericana del Ecuador',
    estado: 'En ejecución',
  },
  {
    position: 5,
    tema: 'Sistema web para la gestión de temas de titulación de la Universidad Iberoamericana del Ecuador',
    estado: 'En ejecución',
  },
];
