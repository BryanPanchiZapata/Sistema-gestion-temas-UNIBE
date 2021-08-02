import { TopicProposalModel } from './../models/topic-proposal-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TopicProposalService {

  private url = 'https://degreetopics-api.herokuapp.com/degreetopics/v1/proposal';

  constructor(private http: HttpClient) { }

  getTopicProposalById(id: string): Observable<any> {
    return this.http.get(this.url + "/" + id).pipe(
      map(response => response), catchError(error => {
          alert(error.error);
          return error;
        }
      )
    );
  }

  createProposal(proposal: TopicProposalModel) {
    return this.http.post(this.url, proposal).pipe(
      map(response => response), catchError(error => {
          alert(error.error);
          return error;
        }
      )
    );
  }
}
