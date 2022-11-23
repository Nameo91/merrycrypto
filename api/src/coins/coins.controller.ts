import { Controller, Get, Query } from '@nestjs/common';
import { CoinService } from './coins.service';

@Controller('coins')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @Get()
  async get(@Query('to') to: string): Promise<{ coins: any }> {
    let coins = await this.coinService.getCoins(to);
    return { coins };
  }
}