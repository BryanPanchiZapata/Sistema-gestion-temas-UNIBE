import { TopicModel } from './../models/topic-model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private url = 'https://degreetopics-api.herokuapp.com/degreetopics/v1/topic';

  constructor(private http: HttpClient) { }

  getTopicsByStatus(): Observable<any> {
    return this.http.get(this.url).pipe(
      map((response) => response),
      catchError((error) => {
        alert(error.error);
        return error;
      })
    );
  }

  getTopicsByCareer(career: string): Observable<any> {
    return this.http.get(this.url + '/career/' + career).pipe(
      map((response) => response),
      catchError((error) => {
        alert(error.error);
        return error;
      })
    );
  }

  getTopicById(id: string): Observable<any> {
    return this.http.get(this.url + '/' + id).pipe(
      map((response) => response),
      catchError((error) => {
        alert(error.error);
        return error;
      })
    );
  }

  addTopic(topic: TopicModel): Observable<any> {
    return this.http.post(this.url, topic).pipe(
      map(response => response),
      catchError(error => {
        alert("Los datos ingresados no son válidos")
        return error
      }
      )
    )
  }

  deleteTopic(id: string): Observable<any> {
    return this.http.delete(this.url + '/' + id).pipe(
      map(response => response),
      catchError(error => {
        alert(error.error)
        return error
      }
      )
    )
  }

  updateTopic(id: string, topic: TopicModel): Observable<any> {
    return this.http.put(this.url + '/' + id, topic).pipe(
      map(response => response),
      catchError(error => {
        alert(error.error)
        return error
      }
      )
    )
  }

  changeToExecuted(id: string) {
    return this.http.patch(this.url + '/' + id, 'Ejecutado').pipe(
      map(response => response),
      catchError(error => {
        alert(error.error)
        return error
      }
      )
    )
  }
}
