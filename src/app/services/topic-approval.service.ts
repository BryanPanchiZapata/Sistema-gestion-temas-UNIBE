import { TopicApprovalModel } from './../models/topic-approval-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TopicModel } from '../models/topic-model';

@Injectable({
  providedIn: 'root'
})
export class TopicApprovalService {
  private url = 'https://degreetopics-api.herokuapp.com/degreetopics/v1/approval_notification';

  constructor(private http: HttpClient) { }

  getTopicApprovalsByCareer(career: string): Observable<any> {
    return this.http.get(this.url + "/career/" + career).pipe(
      map((response) => response),
      catchError((error) => {
        alert(error.error);
        return error;
      })
    );
  }

  getTopicNotificationById(id: string): Observable<any> {
    return this.http.get(this.url + "/" + id).pipe(
      map(response => response), catchError(error => {
        return error;
      }
      )
    );
  }

  getTopicNotificationByStudent(): Observable<any> {
    return this.http.get(this.url + "/student").pipe(
      map(response => response), catchError(error => {
        return error;
      }
      )
    );
  }

  createNotification(notification: TopicApprovalModel): Observable<any> {
    return this.http.post(this.url, notification).pipe(
      map(response => response), catchError(error => {
        alert(error.error);
        return error;
      }
      )
    );
  }


  deleteNotification(id: string): Observable<any> {
    return this.http.delete(this.url + '/' + id).pipe(
      map(response => response),
      catchError(error => {
        alert(error.console.error)
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
}
