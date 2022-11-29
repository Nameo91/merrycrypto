import { Controller, Get, Query } from '@nestjs/common';
import { CoinsService } from './coins.service';

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Get()
  async get(): Promise<{ coins: any }> {
    let coins = await this.coinsService.getCoins();
    return { coins };
  }
}