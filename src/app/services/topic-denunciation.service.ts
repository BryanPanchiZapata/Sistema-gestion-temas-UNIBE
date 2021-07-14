import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TopicDenunciationService {

  private url = 'https://degreetopics-api.herokuapp.com/degreetopics/v1';

  constructor(private http: HttpClient) { }

  getAllTopicDenunciation(): Observable<any> {
    return this.http.get(`${this.url}/topic_denunciation`).pipe(
      map((response) => response),
      catchError((error) => {
        alert(error.error);
        return error;
      })
    );
  }
}
