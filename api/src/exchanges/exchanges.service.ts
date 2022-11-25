import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class ExchangesService {
  static API_ROOT = "https://api.coingecko.com/api/v3/exchanges";

  constructor(private configService: ConfigService, private http: HttpService) { }

  async getData(): Promise<any> {
    let json = await this.request<{ [key: string]: any }>(
      ExchangesService.API_ROOT, {
      });
      
      const data = json

      interface exchangeData { //need to add specifc types
        trustRank: number,
        name: any,
        year: any,
        url: any,
        image: any,
        trustScore: number,
        volume: any
       }
      
       function specificData(data: any) {
        const exchangeObject: exchangeData = {
          trustRank: data.trust_score_rank,
          name: data.name,
          year: data.year_established,
          url: data.url,
          image: data.image,
          trustScore: data.trust_score,
          volume: data.trade_volume_24h_btc.toFixed(0)
        }
        return exchangeObject
      }
      
      const finalData = data.map(specificData)
    return finalData
  } 

  private async request<T>(url: string, params: { [key: string]: any }): Promise<T> {
    let request = this.http.get(url, params).pipe(map(response => response.data));
    return lastValueFrom(request);
  }
}

24