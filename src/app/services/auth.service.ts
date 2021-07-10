import { UserModel } from './../models/user-model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs';
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://degreetopics-api.herokuapp.com/degreetopics/v1/auth';

  private headers: HttpHeaders = new HttpHeaders({'Content-Type' : 'application/json'})

  constructor(private http: HttpClient) {
  }

  login(user: UserModel): Observable<any> {
    return this.http.post(`${this.url}/login`, user).pipe(
      map(response => response),
      catchError(error => {
          alert(error.error)
          return error
        }
      )
    )
  }

  signUpAdmini(user: UserModel){
    return this.http.post(`${this.url}/administrative`, user).pipe(
      map(response => response),
      catchError(error => {
          alert(error.error)
          return error
        }
      )
    )
  }
}
