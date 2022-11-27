import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPortfolioComponent } from './total-portfolio.component';

describe('TotalPortfolioComponent', () => {
  let component: TotalPortfolioComponent;
  let fixture: ComponentFixture<TotalPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPortfolioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
