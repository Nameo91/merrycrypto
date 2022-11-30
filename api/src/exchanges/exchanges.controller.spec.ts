import { Test, TestingModule } from '@nestjs/testing';
import { ExchangesController } from './Exchanges.controller';
import { ExchangesService } from './Exchanges.service';

describe('ExchangesController', () => {
  let controller: ExchangesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangesController],
      providers: [ExchangesService],
    })
      .overrideProvider(ExchangesService)
      .useValue({
        getData: async () => {
          return [{"trustRank":1,"name":"Coinbase Exchange","year":2012,"url":"https://www.coinbase.com","image":"https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png?1621471875","trustScore":10,"volume":"89318"},{"trustRank":2,"name":"Gate.io","year":null,"url":"https://gate.io/","image":"https://assets.coingecko.com/markets/images/60/small/gate_io_logo1.jpg?1654596784","trustScore":10,"volume":"40132"}];
        }
      })
      .compile();

    controller = module.get<ExchangesController>(ExchangesController);
  });

  it('returns Exchnage Data', async () => {
    let response = await controller.get();
    expect(response).toEqual({"exchangeData":[{"trustRank":1,"name":"Coinbase Exchange","year":2012,"url":"https://www.coinbase.com","image":"https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png?1621471875","trustScore":10,"volume":"89318"},{"trustRank":2,"name":"Gate.io","year":null,"url":"https://gate.io/","image":"https://assets.coingecko.com/markets/images/60/small/gate_io_logo1.jpg?1654596784","trustScore":10,"volume":"40132"}]});
  });
});