import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
      })
    )
  };

  register(user: Object = {}, email: string, password: string, username: string) {
    return this.http.post<any>("http://localhost:3000/api/users", {user: {username, email, password}}).pipe(
      map((token) => {
        localStorage.setItem('token', token.user.token);
        return token;
      })
    )
  };
}