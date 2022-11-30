import { Test, TestingModule } from '@nestjs/testing';
import { TwitterService } from './twitter.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('TwitterService', () => {
  let service: TwitterService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [TwitterService],
    }).compile();

    httpService = module.get<HttpService>(HttpService);
    service = module.get<TwitterService>(TwitterService);
  });

  it('should return twitter data', () => {
    expect(service).toBeDefined();
  });
});
