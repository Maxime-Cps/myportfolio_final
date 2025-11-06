import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Neat } from './neat';

describe('Neat', () => {
  let component: Neat;
  let fixture: ComponentFixture<Neat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Neat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Neat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
