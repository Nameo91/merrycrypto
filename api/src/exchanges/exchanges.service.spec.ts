import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { ExchangesService } from './exchanges.service';

describe('ExchangesService', () => {
  let service: ExchangesService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [ExchangesService],
    }).compile();

    httpService = module.get<HttpService>(HttpService);
    service = module.get<ExchangesService>(ExchangesService);
  });

  it('returns exchanges data', async () => {
    const apiData: Object[] = [{"id":"gdax","name":"Coinbase Exchange","year_established":2012,"country":"United States","description":"","url":"https://www.coinbase.com","image":"https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png?1621471875","has_trading_incentive":false,"trust_score":10,"trust_score_rank":1,"trade_volume_24h_btc":89758.58955490781,"trade_volume_24h_btc_normalized":89758.58955490781},{"id":"gate","name":"Gate.io","year_established":null,"country":"Hong Kong","description":"Gate was established in 2013, and it is the top 10 exchanges in the world in terms of authentic trading volume. It is also the first choice of over 8 million registered customers, covering 130+ countries worldwide, as we are providing the most comprehensive digital asset solutions.","url":"https://gate.io/","image":"https://assets.coingecko.com/markets/images/60/small/gate_io_logo1.jpg?1654596784","has_trading_incentive":false,"trust_score":10,"trust_score_rank":2,"trade_volume_24h_btc":40041.543446189586,"trade_volume_24h_btc_normalized":34257.055449021}]
    
    const fakeResponse = {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      data: apiData,
    };

    jest.spyOn(httpService, 'get').mockImplementation(() => of(fakeResponse));
    let response = await service.getData();
    const expectedResult = [{"image": "https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png?1621471875", "name": "Coinbase Exchange", "trustRank": 1, "trustScore": 10, "url": "https://www.coinbase.com", "volume": "89759", "year": 2012}, {"image": "https://assets.coingecko.com/markets/images/60/small/gate_io_logo1.jpg?1654596784", "name": "Gate.io", "trustRank": 2, "trustScore": 10, "url": "https://gate.io/", "volume": "40042", "year": null}]
    expect(response).toEqual(expectedResult);
    expect(httpService.get).toHaveBeenCalledWith(
      'https://api.coingecko.com/api/v3/exchanges', {}
    );
  });
});
