import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {
  static API_URL = '//localhost:3000';

  constructor(private http: HttpClient) { }

  getCoins(): Observable<any> {
    return this.http.get(`${CoinsService.API_URL}/coins`)
      .pipe(map((res: any) => res['coins']));
  }
}