import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class NewsService {
  static API_ROOT = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN";

  constructor(private configService: ConfigService, private http: HttpService) { }

  async getNews(): Promise<any> {
    let json = await this.request<{ [key: string]: any }>(
      NewsService.API_ROOT, {
      });
      
      const data = json.Data

      interface newsData { //need to add specifc types
        title: any,
        url: any,
        image: any,
        body: any,
        tags: any,
       }
      
       function specificData(data: any) {
        const newsObject: newsData = {
          title: data.title,
          url: data.guid,
          image: data.url,
          body: data.body,
          tags: data.tags
        }
        return newsObject
      }
      
      const finalData = data.map(specificData)
      console.log(finalData)
    return finalData
  } 

  private async request<T>(url: string, params: { [key: string]: any }): Promise<T> {
    let request = this.http.get(url, params).pipe(map(response => response.data));
    return lastValueFrom(request);
  }
}