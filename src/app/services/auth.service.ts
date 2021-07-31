import { UserModel, UserAcademicModel } from './../models/user-model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { JwtResponse } from '../models/jwt-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://degreetopics-api.herokuapp.com/degreetopics/v1/auth';
  private token: string | null;
  private role: string | null

  constructor(private http: HttpClient) {
  }

  login(user: UserModel): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, user).pipe(
      tap((res: JwtResponse) => {
        if (res) {
          this.saveToken(res.jwt, res.role)
        }
      }),
      catchError(error => {
        alert(error.error)
        return error
      }
      )
    )
  }

  logOut(): void {
    window.localStorage.clear();
  }

  private saveToken(token: string, role: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("ROLE", role);
    this.token = token;
    this.role = role;
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token
  }

  getRole(): string | null {
    if (!this.role) {
      this.role = localStorage.getItem("ROLE");
    }
    return this.role
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

  profileUser(): Observable<any> {
    return this.http.get(`${this.url}/profile`).pipe(
      map(response => response),
      catchError(error => {
        alert(error.error)
        return error
      }
      )
    )
  }

  editProfile(user: UserAcademicModel): Observable<any> {
    return this.http.put(`${this.url}/profile`, user).pipe(
      map(response => response),
      catchError(error => {
        alert(error.error)
        return error
      }
      )
    )
  }
}
