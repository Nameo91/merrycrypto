import { Test, TestingModule } from '@nestjs/testing';
import { CoinController } from './Coin.controller';
import { CoinService } from './Coin.service';

describe('CoinController', () => {
  let controller: CoinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoinController],
      providers: [CoinService],
    })
      .overrideProvider(CoinService)
      .useValue({
        getCoinData: async () => {
          return {"USD":{"price":"$ 16,805.4","tsupply":"Ƀ 19,220,731.0","csupply":"Ƀ 19,220,731.0","change24h":"$ 401.64","mktcap":"$ 323.01 B","imageURL":"/media/37746251/btc.png","volume24h":"Ƀ 544.64 K","topvolume24h":"Ƀ 61,613.3","high24h":"$ 17,044.2","low24h":"$ 16,326.2"},"GBP":{"price":"£ 14,010.7","tsupply":"Ƀ 19,220,731.0","csupply":"Ƀ 19,220,731.0","change24h":"£ 325.97","mktcap":"£ 269.30 B","imageURL":"/media/37746251/btc.png","volume24h":"Ƀ 544.64 K","topvolume24h":"Ƀ 1,273.80","high24h":"£ 14,231.0","low24h":"£ 13,353.8"},"EUR":{"price":"€ 16,204.0","tsupply":"Ƀ 19,220,731.0","csupply":"Ƀ 19,220,731.0","change24h":"€ 320.74","mktcap":"€ 311.45 B","imageURL":"/media/37746251/btc.png","volume24h":"Ƀ 544.64 K","topvolume24h":"Ƀ 6,149.02","high24h":"€ 16,498.9","low24h":"€ 15,791.1"}};
        },
        getCoinHistory: async () => {
          return [{"time":["30/11/2022, 12:00:00","30/11/2022, 13:00:00"],"price":[16782.45,16794.04]}];
        }
      })
      .compile();

    controller = module.get<CoinController>(CoinController);
  });

  it('returns Coin Data', async () => {
    let response = await controller.getCoinData('BTC');
    expect(response).toEqual({"coinData":{"USD":{"price":"$ 16,805.4","tsupply":"Ƀ 19,220,731.0","csupply":"Ƀ 19,220,731.0","change24h":"$ 401.64","mktcap":"$ 323.01 B","imageURL":"/media/37746251/btc.png","volume24h":"Ƀ 544.64 K","topvolume24h":"Ƀ 61,613.3","high24h":"$ 17,044.2","low24h":"$ 16,326.2"},"GBP":{"price":"£ 14,010.7","tsupply":"Ƀ 19,220,731.0","csupply":"Ƀ 19,220,731.0","change24h":"£ 325.97","mktcap":"£ 269.30 B","imageURL":"/media/37746251/btc.png","volume24h":"Ƀ 544.64 K","topvolume24h":"Ƀ 1,273.80","high24h":"£ 14,231.0","low24h":"£ 13,353.8"},"EUR":{"price":"€ 16,204.0","tsupply":"Ƀ 19,220,731.0","csupply":"Ƀ 19,220,731.0","change24h":"€ 320.74","mktcap":"€ 311.45 B","imageURL":"/media/37746251/btc.png","volume24h":"Ƀ 544.64 K","topvolume24h":"Ƀ 6,149.02","high24h":"€ 16,498.9","low24h":"€ 15,791.1"}}})
  });
  xit('returns Coin History', async () => {
    let response = await controller.getCoinHistory('BTC', 'USD', 1);
    expect(response).toEqual({"time":["30/11/2022, 12:00:00","30/11/2022, 13:00:00"],"price":[16782.45,16794.04]})
  });
});