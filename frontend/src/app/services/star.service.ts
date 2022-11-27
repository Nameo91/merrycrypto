import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StarService implements OnInit {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  updateWatchlist(starredCoins: string, userId: number): Observable<any> {
    const token: any = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + token,
    });
    let options = { headers };
    let body = { starredCoins };
    return this.http
      .put<any>(`http://localhost:3000/api/star/${userId}`, body, options)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getStarredCoins(userId: number): Observable<any> {
    const token: any = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + token,
    });
    let options = { headers };
    return this.http
      .get<any>(`http://localhost:3000/api/${userId}`, options)
      .pipe(map((res: any) => {
          return res['_body'];
        })
      );
  }
}
