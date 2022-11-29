import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  static API_URL = '//localhost:3000';

  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    return this.http.get(`${NewsService.API_URL}/news`)
      .pipe(map((res: any) => res['news']));
  }
}