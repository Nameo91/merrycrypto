import { Controller, Get } from '@nestjs/common';
import { GlobalService } from '@app/global/global.service';

@Controller()
export class GlobalController {
  constructor(private readonly globalService: GlobalService) {}

  @Get('api/global')
  async get(): Promise<{ globalData: any }> {
    let globalData = await this.globalService.getData();
    return { globalData };
  }
}