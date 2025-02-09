import { TopicDenunciationModel } from './../models/topic-denunciation-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TopicDenunciationService {

  private url = 'https://degreetopics-api.herokuapp.com/degreetopics/v1/topic_denunciation';

  constructor(private http: HttpClient) { }

  getTopicDenunciationById(id: string): Observable<any> {
    return this.http.get(this.url + "/" + id).pipe(
      map(response => response), catchError(error => {
        return error;
      }
      )
    );
  }

  getTopicDenunciationByStudentId(): Observable<any> {
    return this.http.get(this.url).pipe(
      map(response => response), catchError(error => {
        return error;
      }
      )
    );
  }

  createDenunciation(topicDenunciation: TopicDenunciationModel): Observable<any> {
    return this.http.post(this.url, topicDenunciation).pipe(
      map(response => response), catchError(error => {
        alert(error.error);
        return error;
      }
      )
    );
  }

  deleteDenunciation(id: string): Observable<any> {
    return this.http.delete(this.url + '/' + id).pipe(
      map(response => response), catchError(error => {
        alert(error.error);
        return error;
      }
      )
    );
  }
}
