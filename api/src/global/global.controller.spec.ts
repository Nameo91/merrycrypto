import { Test, TestingModule } from '@nestjs/testing';
import { GlobalController } from './global.controller';
import { GlobalService } from './global.service';

describe('GlobalController', () => {
  let controller: GlobalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalController],
      providers: [GlobalService],
    })
      .overrideProvider(GlobalService)
      .useValue({
        getData: async () => {
          return {"mc":"890,868,815,096","mcChange":"1.94","volume":"53,862,711,377","coins":13148}
        }
      })
      .compile();

    controller = module.get<GlobalController>(GlobalController);
  });

  it('returns global market data', async () => {
    let response = await controller.get();
    expect(response).toEqual({"globalData":{"mc":"890,868,815,096","mcChange":"1.94","volume":"53,862,711,377","coins":13148}});
  });
});
