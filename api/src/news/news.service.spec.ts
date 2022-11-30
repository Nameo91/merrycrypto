import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { NewsService } from './News.service';

describe('NewsService', () => {
  let service: NewsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [NewsService],
    }).compile();

    httpService = module.get<HttpService>(HttpService);
    service = module.get<NewsService>(NewsService);
  });

  it('should return news data', () => {
    expect(service).toBeDefined();
  });
});
