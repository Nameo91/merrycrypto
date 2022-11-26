import { Test, TestingModule } from '@nestjs/testing';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';

describe('PriceController', () => {
  let controller: PriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceController],
      providers: [PriceService],
    })
      .overrideProvider(PriceService)
      .useValue({
        getPrice: async () => {
          return 44.44;
        }
      })
      .compile();

    controller = module.get<PriceController>(PriceController);
  });

  it('returns price for pairing', async () => {
    let response = await controller.get('BTC', 'USD');
    expect(response).toEqual({ price: 44.44 });
  });
});
