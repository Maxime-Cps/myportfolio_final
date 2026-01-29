import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeAnimation } from './welcome-animation';

describe('WelcomeAnimation', () => {
  let component: WelcomeAnimation;
  let fixture: ComponentFixture<WelcomeAnimation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeAnimation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeAnimation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
