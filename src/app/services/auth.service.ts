import { UserModel, UserAcademicModel } from './../models/user-model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://degreetopics-api.herokuapp.com/degreetopics/v1/auth';

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

  signUpAdmini(user: UserModel): Observable<any> {
    return this.http.post(`${this.url}/administrative`, user).pipe(
      map(response => response),
      catchError(error => {
        alert(error.error)
        return error
      }
      )
    )
  }

  signUpAcademic(user: UserAcademicModel): Observable<any> {
    return this.http.post(`${this.url}/academic`, user).pipe(
      map(response => response),
      catchError(error => {
        alert(error.error)
        return error
      }
      )
    )
  }

  editProfileAcademic(id: string, user: UserAcademicModel):Observable<any> {
    return this.http.put(`${this.url}/academic/${id}`, user).pipe(
      map(response => response),
      catchError(error => {
        alert(error.error)
        return error
      }
      )
    )
  }

  editProfileAdmini(id: string, user: UserModel):Observable<any> {
    return this.http.put(`${this.url}/administrative/${id}`, user).pipe(
      map(response => response),
      catchError(error => {
        alert(error.error)
        return error
      }
      )
    )
  }

  getAcademicById(id: string):Observable<any> {
    return this.http.get(this.url + "/academic/" + id).pipe(
      map(response => response),
      catchError(error => {
        alert(error.error)
        return error
      }
      )
    )
  }

  getAdminiById(id: string):Observable<any> {
    return this.http.get(this.url + "/administrative/" + id).pipe(
      map(response => response),
      catchError(error => {
        alert(error.error)
        return error
      }
      )
    )
  }
}
