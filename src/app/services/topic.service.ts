import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private  url= 'https://degreetopics-api.herokuapp.com/degreetopics/v1/topic'

  constructor(private http:HttpClient) {
  }
}
