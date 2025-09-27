import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Experiences } from './experiences';

describe('Experiences', () => {
  let component: Experiences;
  let fixture: ComponentFixture<Experiences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Experiences]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Experiences);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
