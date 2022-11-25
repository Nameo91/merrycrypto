import { Controller, Get } from '@nestjs/common';
import { GlobalService } from './global.service';

@Controller('global')
export class GlobalController {
  constructor(private readonly globalService: GlobalService) {}

  @Get()
  async get(): Promise<{ globalData: any }> {
    let globalData = await this.globalService.getData();
    return { globalData };
  }
}