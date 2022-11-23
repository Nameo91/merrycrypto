import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

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
      map((token) => {
        localStorage.setItem('token', token.user.token);
        return token;
      }),
      catchError(this.handleError)
    )
  };

  private handleError(error: HttpErrorResponse) {
    let errorMessage = error.error.message
    return throwError(errorMessage);
  }
}