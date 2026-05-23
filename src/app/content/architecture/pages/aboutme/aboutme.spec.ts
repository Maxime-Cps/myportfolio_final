import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { Aboutme } from './aboutme';

describe('Aboutme', () => {
  let component: Aboutme;
  let fixture: ComponentFixture<Aboutme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aboutme],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
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
