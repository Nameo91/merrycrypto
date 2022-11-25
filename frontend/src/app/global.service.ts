import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  static API_URL = '//localhost:3000';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${GlobalService.API_URL}/global`)
      .pipe(map((res: any) => res['globalData']));
  }
}