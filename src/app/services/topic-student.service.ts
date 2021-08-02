import { TopicStudentModel } from './../models/topic-student-model';
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
  constructor(private http: HttpClient) { }

  getTopicStudentsByCareer(career: string, topicStatus: string): Observable<any> {
    return this.http.get(this.url + '/career/' + career + '/topic_status/' + topicStatus).pipe(
      map((response) => response),
      catchError((error) => {
        alert(error.error);
        return error;
      })
    );
  }

  getTopicsByStatus(topicStatus: string): Observable<any> {
    return this.http.get(this.url + '/topic_status/' + topicStatus).pipe(
      map((response) => response),
      catchError((error) => {
        alert(error.error);
        return error;
      })
    );
  }

  assigmentTopic(topicStudent: TopicStudentModel): Observable<any> {
    return this.http.post(this.url, topicStudent).pipe(
      map((response) => response),
      catchError((error) => {
        alert(error.error);
        return error;
      })
    );
  }

  getTopicStudentById(id: string): Observable<any> {
    return this.http.get(this.url + '/' + id).pipe(
      map((response) => response), catchError(error => {
        return error;
      }
      )
    );
  }

  getTopicStudentByStudentId(): Observable<any> {
    return this.http.get(this.url + '/student').pipe(
      map((response) => response), catchError(error => {
        return error;
      }
      )
    );
  }

  getTopicStudentByStudent(ci: string, career: string): Observable<any> {
    return this.http.get(this.url + '/student/' + ci + '/student/' + career).pipe(
      map((response) => response),
      catchError((error) => {
        alert(error.error);
        return error;
      })
    );
  }

  paymentDenunciation(ci: string, payment: String): Observable<any> {
    return this.http.patch(this.url + '/student/' + ci, payment).pipe(
      map((response) => response),
      catchError((error) => {
        alert(error.error);
        return error;
      })
    );
  }


  evaluationProposal(id: string, topicStudent: TopicStudentModel): Observable<any> {
    return this.http.patch(this.url + '/' + id, topicStudent).pipe(
      map((response) => response),
      catchError((error) => {
        alert(error.error);
        return error;
      })
    );
  }

  deleteAssigment(id:string) {
    return this.http.delete(this.url + '/' + id).pipe(
      map((response) => response),
      catchError((error) => {
        alert(error.error);
        return error;
      })
    );
  }
}
