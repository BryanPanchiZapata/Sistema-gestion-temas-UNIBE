import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TopicStudentService {
  private url =
    'https://degreetopics-api.herokuapp.com/degreetopics/v1/student_topic';
  constructor(private http: HttpClient) {}

  getTopicStudentById(id: string): Observable<any> {
    return this.http.get(this.url + '/' + id).pipe(
      map((response) => response),
      catchError((error) => {
        alert(error.error);
        return error;
      })
    );
  }

  getTopicDenunciationById(id: string): Observable<any> {
    return this.http.get(this.url).pipe(
      map((response) => response),
      catchError((error) => {
        alert(error.error);
        return error;
      })
    );
  }
}
