import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTools } from './card-tools';

describe('CardTools', () => {
  let component: CardTools;
  let fixture: ComponentFixture<CardTools>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTools]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTools);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
