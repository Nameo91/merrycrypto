import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom, map } from "rxjs";

@Injectable()
export class CoinService {
  static API_ROOT1 = "https://min-api.cryptocompare.com/data/pricemultifull";
  static API_ROOT2 = "https://min-api.cryptocompare.com/data/v2/histohour";

  constructor(private configService: ConfigService, private http: HttpService) { }

  async getCoinData(coin: string): Promise<any> {
    let json = await this.request<{ [key: string]: any }>(
      CoinService.API_ROOT1, {
        params: {
          apiKey: this.configService.get<string>('CRYPTOCOMPARE_API_KEY'),
          fsyms: coin,
          tsyms: 'USD,EUR,GBP'
        }
      });

      const coinInfo = json.DISPLAY[coin];
      
      interface CryptoCoin {
        USD: {
          price: any,
          imageURL: any,
          mktcap: any,
          tsupply: any,
          csupply: any,
          change24h: any,
          volume24h: any,
          topvolume24h: any,
          high24h: any,
          low24h: any,
        },
        GBP: {
          price: any,
          imageURL: any,
          mktcap: any,
          tsupply: any,
          csupply: any,
          change24h: any,
          volume24h: any,
          topvolume24h: any,
          high24h: any,
          low24h: any,
        },
        EUR: {
          price: any,
          imageURL: any,
          mktcap: any,
          tsupply: any,
          csupply: any,
          change24h: any,
          volume24h: any,
          topvolume24h: any,
          high24h: any,
          low24h: any,
        }
       }
      
       function getSpecificData(coin: any) {
        const coinObject: CryptoCoin = {
          USD: {
            price: coin.USD.PRICE,
            tsupply: coin.USD.SUPPLY,
            csupply: coin.USD.CIRCULATINGSUPPLY,
            change24h: coin.USD.CHANGE24HOUR,
            mktcap: coin.USD.MKTCAP,
            imageURL: coin.USD.IMAGEURL,
            volume24h: coin.USD.TOTALVOLUME24H,
            topvolume24h: coin.USD.TOPTIERVOLUME24HOUR,
            high24h: coin.USD.HIGH24HOUR,
            low24h: coin.USD.LOW24HOUR,
          },
          GBP: {
            price: coin.GBP.PRICE,
            tsupply: coin.GBP.SUPPLY,
            csupply: coin.GBP.CIRCULATINGSUPPLY,
            change24h: coin.GBP.CHANGE24HOUR,
            mktcap: coin.GBP.MKTCAP,
            imageURL: coin.GBP.IMAGEURL,
            volume24h: coin.GBP.TOTALVOLUME24H,
            topvolume24h: coin.GBP.TOPTIERVOLUME24HOUR,
            high24h: coin.GBP.HIGH24HOUR,
            low24h: coin.GBP.LOW24HOUR,
          },
          EUR: {
            price: coin.EUR.PRICE,
            tsupply: coin.EUR.SUPPLY,
            csupply: coin.EUR.CIRCULATINGSUPPLY,
            change24h: coin.EUR.CHANGE24HOUR,
            mktcap: coin.EUR.MKTCAP,
            imageURL: coin.EUR.IMAGEURL,
            volume24h: coin.EUR.TOTALVOLUME24H,
            topvolume24h: coin.EUR.TOPTIERVOLUME24HOUR,
            high24h: coin.EUR.HIGH24HOUR,
            low24h: coin.EUR.LOW24HOUR,
          } 
        }
        return coinObject;
      }

      const finalData = getSpecificData(coinInfo);
      return finalData;
  }


  async getCoinHistory(id: string, currency: string, interval: number): Promise<any> {
    let json = await this.request<{ [key: string]: any }>(
      CoinService.API_ROOT2, {
        params: {
          apiKey: this.configService.get<string>('CRYPTOCOMPARE_API_KEY'),
          fsym: id,
          tsym: currency,
          limit: interval
        }
      });
      
      const coinHistory = json.Data.Data;

      interface CoinHistory {
        time: any,
        close: any,
      }

      function getSpecificHistoryData(coinHistory: any) {
        const coinHistoryObject: CoinHistory = {
          time: new Date (coinHistory.time * 1000).toLocaleString(),
          close: coinHistory.close,
        }
        return coinHistoryObject;
      }

      const finalData = coinHistory.map(getSpecificHistoryData);
      return finalData;
  }

  private async request<T>(url: string, params: { [key: string]: any }): Promise<T> {
    let request = this.http.get(url, params).pipe(map(response => response.data));
    return lastValueFrom(request);
  }

}