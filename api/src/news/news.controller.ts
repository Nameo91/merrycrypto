import { Controller, Get } from '@nestjs/common';
import { NewsService } from '@app/news/news.service';

@Controller()
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('api/news')
  async get(): Promise<{ news: any }> {
    let news = await this.newsService.getNews();
    return { news };
  }
}