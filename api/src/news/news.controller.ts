import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async get(): Promise<{ news: any }> {
    let news = await this.newsService.getNews();
    return { news };
  }
}