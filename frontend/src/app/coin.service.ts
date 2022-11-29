import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  static API_URL = '//localhost:3000';

  constructor(private http: HttpClient) { }

  getCoinData(id: string): Observable<any> {
    return this.http.get(`${CoinService.API_URL}/api/${id}`, )
      .pipe(map((res: any) => res['coinData']));
  }

  getCoinHistory(id: string, currency: string, interval: number): Observable<any> {
    return this.http.get(`${CoinService.API_URL}/api/history/${id}/${currency}/${interval}`,)
    .pipe(map((res: any) => res));
  }
}