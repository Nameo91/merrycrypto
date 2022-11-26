import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PriceService } from './price.service';

describe('PriceService', () => {
  let service: PriceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(PriceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should return price', (done) => {
    service.getPrice('BTC', 'USD').subscribe(price => {
      expect(price).toEqual(44.44);
      done();
    });
    httpTestingController
      .expectOne('//localhost:3000/price?from=BTC&to=USD')
      .flush({ price: 44.44 });
  });
});
