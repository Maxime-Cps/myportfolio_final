import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpInfo } from './exp-info';

describe('ExpInfo', () => {
  let component: ExpInfo;
  let fixture: ComponentFixture<ExpInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
