import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameworksTab } from './frameworks-tab';

describe('FrameworksTab', () => {
  let component: FrameworksTab;
  let fixture: ComponentFixture<FrameworksTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameworksTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrameworksTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
