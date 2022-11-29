import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedTweetComponent } from './related-tweet.component';

describe('RelatedTweetComponent', () => {
  let component: RelatedTweetComponent;
  let fixture: ComponentFixture<RelatedTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedTweetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
