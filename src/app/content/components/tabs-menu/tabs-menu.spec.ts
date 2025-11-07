import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsMenu } from './tabs-menu';

describe('TabsMenu', () => {
  let component: TabsMenu;
  let fixture: ComponentFixture<TabsMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
