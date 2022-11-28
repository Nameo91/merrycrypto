import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class PriceService {
  static API_ROOT = "https://min-api.cryptocompare.com/data/price";

  constructor(private configService: ConfigService, private http: HttpService) { }

  async getPrice(from: string, to: string): Promise<number> {
    let json = await this.request<{ [key: string]: number }>(
      PriceService.API_ROOT, {
        params: {
          apiKey: this.configService.get<string>('CRYPTOCOMPARE_API_KEY'),
          fsym: from,
          tsyms: to,
        }
      });
    return json[to];
  }

  private async request<T>(url: string, params: { [key: string]: any }): Promise<T> {
    let request = this.http.get(url, params).pipe(map(response => response.data));
    return lastValueFrom(request);
  }
}
