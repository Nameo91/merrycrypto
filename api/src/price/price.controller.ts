import { Controller, Get, Query } from '@nestjs/common';
import { PriceService } from './price.service';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  async get(@Query('from') from: string, @Query('to') to: string): Promise<{ price: number }> {
    let price = await this.priceService.getPrice(from, to);
    return { price };
  }
}
