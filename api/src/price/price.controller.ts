import { Controller, Get, Query } from '@nestjs/common';
import { PriceService } from '@app/price/price.service';

@Controller()
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get('api/price')
  async get(@Query('from') from: string, @Query('to') to: string): Promise<{ price: number }> {
    let price = await this.priceService.getPrice(from, to);
    return { price };
  }
}
