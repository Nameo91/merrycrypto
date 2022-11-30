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

  it('returns News data', async () => {
    const fakeResponse = {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      data: '' // add in what we get from the api i.e what we get from here -> https://min-api.cryptocompare.com/data/v2/news/?lang=EN
    };

    jest.spyOn(httpService, 'get').mockImplementation(() => of(fakeResponse));
    let response = await service.getNews();
    expect(response).toEqual(''); // add it what we get from our response i.e what appears on here -> http://localhost:3000/news
    expect(httpService.get).toHaveBeenCalledWith(
      'https://min-api.cryptocompare.com/data/v2/news/?lang=EN', {}
    );
  });
});
