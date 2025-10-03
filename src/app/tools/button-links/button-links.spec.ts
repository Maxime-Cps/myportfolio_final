import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLinks } from './button-links';

describe('ButtonLinks', () => {
  let component: ButtonLinks;
  let fixture: ComponentFixture<ButtonLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonLinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonLinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
