import { Controller, Get } from '@nestjs/common';
import { ExchangesService } from './exchanges.service';

@Controller('exchanges')
export class ExchangesController {
  constructor(private readonly exchangesService: ExchangesService) {}

  @Get()
  async get(): Promise<{ data: any }> {
    let data = await this.exchangesService.getData();
    return { data };
  }
}