import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpPro } from './exp-pro';

describe('ExpPro', () => {
  let component: ExpPro;
  let fixture: ComponentFixture<ExpPro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpPro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpPro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
