import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { PriceService } from './price.service';

describe('PriceService', () => {
  let service: PriceService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot({ envFilePath: '.env.test' })],
      providers: [PriceService],
    }).compile();

    httpService = module.get<HttpService>(HttpService);
    service = module.get<PriceService>(PriceService);
  });

  it('returns price for pairing', async () => {
    const fakeResponse = {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      data: {
        USD: 44.44,
      },
    };

    jest.spyOn(httpService, 'get').mockImplementation(() => of(fakeResponse));
    let response = await service.getPrice('BTC', 'USD');
    expect(response).toEqual(44.44);
    expect(httpService.get).toHaveBeenCalledWith(
      'https://min-api.cryptocompare.com/data/price',
      {
        params: {
          apiKey: "1234",
          fsym: 'BTC',
          tsyms: 'USD',
        },
      },
    );
  });
});
