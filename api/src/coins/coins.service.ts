import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class CoinService {
  static API_ROOT = "https://min-api.cryptocompare.com/data/top/mktcapfull";

  constructor(private configService: ConfigService, private http: HttpService) { }

  async getCoins(): Promise<any> {
    let json = await this.request<{ [key: string]: any }>(
      CoinService.API_ROOT, {
        params: {
          apiKey: this.configService.get<string>('CRYPTOCOMPARE_API_KEY'),
          limit: 10, // how many coins to show
          tsym: 'USD', // currency i.e USD
        }
      });
     
      const coins = json.Data

      interface CryptoCoin {
        name: any,
        price: any,
        mc: any,
        dc: any
       }

      function specificData(coin) {
        const coinObject: CryptoCoin = {
          name: coin.CoinInfo.Name,
          price: coin.DISPLAY.USD.PRICE,
          mc: coin.DISPLAY.USD.MKTCAP,
          dc: coin.DISPLAY.USD.CHANGEPCT24HOUR
        }
        return coinObject
      }

      const finalData = coins.map(specificData)
      //http://localhost:3000/coins?to=USD
    return finalData
  }

  private async request<T>(url: string, params: { [key: string]: any }): Promise<T> {
    let request = this.http.get(url, params).pipe(map(response => response.data));
    return lastValueFrom(request);
  }
}