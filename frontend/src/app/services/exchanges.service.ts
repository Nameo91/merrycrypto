import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangesService {
  static API_URL = '//localhost:3000';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${ExchangesService.API_URL}/exchanges`)
      .pipe(map((res: any) => res['exchangeData']));
  }
}