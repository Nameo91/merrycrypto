import { TestBed } from '@angular/core/testing';

import { RelatedTweetService } from './related-tweet.service';

describe('RelatedTweetService', () => {
  let service: RelatedTweetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatedTweetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
