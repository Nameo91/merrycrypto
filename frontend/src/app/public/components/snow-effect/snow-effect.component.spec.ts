import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowEffectComponent } from './snow-effect.component';

describe('SnowEffectComponent', () => {
  let component: SnowEffectComponent;
  let fixture: ComponentFixture<SnowEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnowEffectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnowEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
