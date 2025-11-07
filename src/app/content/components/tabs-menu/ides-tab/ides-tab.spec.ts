import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdesTab } from './ides-tab';

describe('IdesTab', () => {
  let component: IdesTab;
  let fixture: ComponentFixture<IdesTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdesTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdesTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
