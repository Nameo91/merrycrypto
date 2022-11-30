import { Test, TestingModule } from '@nestjs/testing';
import { CoinsController } from './Coins.controller';
import { CoinsService } from './Coins.service';

describe('CoinsController', () => {
  let controller: CoinsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoinsController],
      providers: [CoinsService],
    })
      .overrideProvider(CoinsService)
      .useValue({
        getCoins: async () => {
          return [{"name":"BTC","price":16874.5,"mc":324.34,"dc":"2.47","imageURL":"/media/37746251/btc.png","volume":1025.65},{"name":"ETH","price":1266.28,"mc":154.96,"dc":"4.19","imageURL":"/media/37746238/eth.png","volume":613.03},{"name":"USDT","price":0.9999,"mc":65.36,"dc":"0.02","imageURL":"/media/37746338/usdt.png","volume":233.9}];
        }
      })
      .compile();

    controller = module.get<CoinsController>(CoinsController);
  });

  it('returns Exchnage Data', async () => {
    let response = await controller.get();
    expect(response).toEqual({"coins":[{"name":"BTC","price":16874.5,"mc":324.34,"dc":"2.47","imageURL":"/media/37746251/btc.png","volume":1025.65},{"name":"ETH","price":1266.28,"mc":154.96,"dc":"4.19","imageURL":"/media/37746238/eth.png","volume":613.03},{"name":"USDT","price":0.9999,"mc":65.36,"dc":"0.02","imageURL":"/media/37746338/usdt.png","volume":233.9}]});
  });
});