import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeatComponent } from './neat';

describe('Neat', () => {
  let component: NeatComponent;
  let fixture: ComponentFixture<NeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
