import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url = 'https://degreetopics-api.herokuapp.com/degreetopics/v1/academic';
  constructor(private http: HttpClient) {}
 /*  getAllAcademic(): Observable<any> {
    return this.http.get(`${this.url}/academic`).pipe(
      map((response) => response),
      catchError((error) => {
        alert(error.error);
        return error;
      })
    );
  } */
  getByIdAcademic(id: String): Observable<any> {
    return this.http.get(this.url + "/" + id).pipe(
      map(response => response), catchError(error => {
          alert(error.error);
          return error;
        }
      )
    );
  }
}
