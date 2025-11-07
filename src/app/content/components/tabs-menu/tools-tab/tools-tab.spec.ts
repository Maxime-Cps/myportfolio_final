import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsTab } from './tools-tab';

describe('ToolsTab', () => {
  let component: ToolsTab;
  let fixture: ComponentFixture<ToolsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolsTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
