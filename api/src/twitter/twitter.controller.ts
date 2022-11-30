import { Controller, Get, Param } from '@nestjs/common';
import { TwitterService } from '@app/twitter/twitter.service';

@Controller()
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Get('api/twitter/:id')
  async getTwitterData(@Param('id') id: string): Promise<any> {
    const twitterData = await this.twitterService.getTwitterData(id);
    return { twitterData };
  }
}
