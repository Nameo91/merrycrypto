import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedNewsComponent } from './tagged-news.component';

describe('TaggedNewsComponent', () => {
  let component: TaggedNewsComponent;
  let fixture: ComponentFixture<TaggedNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaggedNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaggedNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
