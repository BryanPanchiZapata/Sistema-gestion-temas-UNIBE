
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], texto:string): any[] {
    if(!texto) return value;
    return value.filter( dataSource=> dataSource.name.toUpperCase().includes(texto.toUpperCase()));
  }
}
