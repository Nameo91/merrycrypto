import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class PriceService {
  static API_ROOT = "https://min-api.cryptocompare.com/data/top/mktcapfull";

  constructor(private configService: ConfigService, private http: HttpService) { }

  async getPrice(to: string): Promise<any> {
    let json = await this.request<{ [key: string]: any }>(
      PriceService.API_ROOT, {
        params: {
          apiKey: this.configService.get<string>('CRYPTOCOMPARE_API_KEY'),
          limit: 10, // how many coins to show
          tsym: to, // currency i.e USD
        }
      });
      console.log(json.Data)
      const coins = json.Data
      
      function relevantData(coin) {
        return [coin.CoinInfo.Name, coin.DISPLAY.USD.MKTCAP, coin.DISPLAY.USD.CHANGEPCT24HOUR, coin.DISPLAY.USD.PRICE]
      }

      const finalData = coins.map(relevantData)
      //http://localhost:3000/coins?from=BTC&to=USD
    return finalData
  }

  private async request<T>(url: string, params: { [key: string]: any }): Promise<T> {
    let request = this.http.get(url, params).pipe(map(response => response.data));
    return lastValueFrom(request);
  }
}