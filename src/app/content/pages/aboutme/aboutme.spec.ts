import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aboutme } from './aboutme';

describe('Aboutme', () => {
  let component: Aboutme;
  let fixture: ComponentFixture<Aboutme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aboutme]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Aboutme);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
