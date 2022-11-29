import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedTwitComponent } from './related-twit.component';

describe('RelatedTwitComponent', () => {
  let component: RelatedTwitComponent;
  let fixture: ComponentFixture<RelatedTwitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedTwitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedTwitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
