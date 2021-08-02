import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcademicUserService {

  private url = 'https://degreetopics-api.herokuapp.com/degreetopics/v1/academic';

  constructor(private http: HttpClient) { }

  getDirectorCareer(career: string): Observable<any> {
    return this.http.get(this.url + '/career/' + career).pipe(
      map(response => response),
      catchError(error => {
        alert(error.error)
        return error
      }
      )
    )
  }
}
