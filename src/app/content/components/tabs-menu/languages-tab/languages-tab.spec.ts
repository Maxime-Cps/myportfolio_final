import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesTab } from './languages-tab';

describe('LanguagesTab', () => {
  let component: LanguagesTab;
  let fixture: ComponentFixture<LanguagesTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguagesTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguagesTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
