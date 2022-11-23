import { Controller, Get, Query } from '@nestjs/common';
import { PriceService } from './coins.service';

@Controller('coins')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  async get(@Query('to') to: string): Promise<{ coins: any }> {
    let coins = await this.priceService.getPrice(to);
    return { coins };
  }
}