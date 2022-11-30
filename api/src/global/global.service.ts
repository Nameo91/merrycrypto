import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class GlobalService {
  static API_ROOT = "https://api.coingecko.com/api/v3/global";

  constructor(private configService: ConfigService, private http: HttpService) { }

  async getData(): Promise<any> {
    let json = await this.request<{ [key: string]: any }>(
      GlobalService.API_ROOT, {
      });
      
      interface globalData {
        mc: string,
        mcChange: number,
        volume: string,
        coins: number,
       }

      const requiredData: globalData = {
         mc: Math.round(json.data.total_market_cap.usd).toLocaleString("en-US"),
         mcChange: json.data.market_cap_change_percentage_24h_usd.toFixed(2),
         volume: Math.round(json.data.total_volume.usd).toLocaleString("en-US"),
         coins: json.data.active_cryptocurrencies.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
    
    return requiredData
  } 

  private async request<T>(url: string, params: { [key: string]: any }): Promise<T> {
    let request = this.http.get(url, params).pipe(map(response => response.data));
    return lastValueFrom(request);
  }
}