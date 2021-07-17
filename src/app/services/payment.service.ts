import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private url = 'https://degreetopics-api.herokuapp.com/degreetopics/v1';
  constructor(private http: HttpClient) {}
  getAllTopicStudent(): Observable<any> {
    return this.http.get(`${this.url}/student_topic`).pipe(
      map((response) => response),
      catchError((error) => {
        alert(error.error);
        return error;
      })
    );
  }
}
