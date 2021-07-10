import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private url = 'https://degreetopics-api.herokuapp.com/degreetopics/v1/topic';

  constructor(private http: HttpClient) {}

  getAllTopic(): Observable<any> {
    return this.http.get(this.url).pipe(
      map((response) => response),
      catchError((error) => {
        alert(error.error);
        return error;
      })
    );
  }
}

/* `${this.url}/administrative` */

