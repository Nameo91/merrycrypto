import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  static API_URL = '//localhost:3000';

  constructor(private http: HttpClient) { }

  getPrice(from: string, to: string): Observable<number> {
    return this.http.get(`${PriceService.API_URL}/api/price?from=${from}&to=${to}`)
      .pipe(map((res: any) => res['price']));
  }
}
