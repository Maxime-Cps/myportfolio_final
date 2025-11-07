import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineStudies } from './timeline-studies';

describe('TimelineStudies', () => {
  let component: TimelineStudies;
  let fixture: ComponentFixture<TimelineStudies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineStudies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineStudies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
