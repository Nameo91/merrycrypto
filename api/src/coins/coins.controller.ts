import { Controller, Get, Query } from '@nestjs/common';
import { CoinsService } from '@app/coins/coins.service';

@Controller()
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Get('api/coins')
  async get(): Promise<{ coins: any }> {
    let coins = await this.coinsService.getCoins();
    return { coins };
  }
}