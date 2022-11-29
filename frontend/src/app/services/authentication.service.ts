import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  signin(user: Object = {}, email: string, password: string) { 
    return this.http.post<any>('http://localhost:3000/api/users/login', {user: {email, password}}).pipe(
      map((token) => {
        localStorage.setItem('token', token.user.token);
        return token;
      }),
      catchError(this.handleError)
    )
  };

  register(user: Object = {}, email: string, password: string, username: string) {
    return this.http.post<any>("http://localhost:3000/api/users", {user: {username, email, password}}).pipe(
      catchError(this.handleError)
    )
  };

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token: any = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  };

  getUserInfo(): Observable<any> {
    let token: any = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token });
    let options = { headers: headers };

    return this.http.get<any>("http://localhost:3000/api/user", options)
      .pipe(map((res: any) => res['user']));
  };

  private handleError(error: HttpErrorResponse) {
    let errorMessage = error.error.message
    return throwError(errorMessage);
  };

}