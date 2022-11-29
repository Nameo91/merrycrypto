import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatedTweetService {
  static API_URL = '//localhost:3000';

  constructor(private http: HttpClient) { }

  getRelatedTweets(id: string): Observable<any> {
    return this.http.get(`${RelatedTweetService.API_URL}/api/twitter/${id}`)
    .pipe(map((res: any) => res['twitterData']));
  }
}
