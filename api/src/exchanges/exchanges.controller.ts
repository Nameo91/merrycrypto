import { Controller, Get } from '@nestjs/common';
import { ExchangesService } from '@app/exchanges/exchanges.service';

@Controller()
export class ExchangesController {
  constructor(private readonly exchangesService: ExchangesService) {}

  @Get('api/exchanges')
  async get(): Promise<{ exchangeData: any }> {
    let exchangeData = await this.exchangesService.getData();
    return { exchangeData };
  }
}