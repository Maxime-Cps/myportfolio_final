import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageIntro } from './page-intro';
import { ComponentRef } from '@angular/core';

describe('PageIntro', () => {
  let fixture: ComponentFixture<PageIntro>;
  let ref: ComponentRef<PageIntro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageIntro]
    }).compileComponents();

    fixture = TestBed.createComponent(PageIntro);
    ref = fixture.componentRef;
    ref.setInput('kicker', '// test kicker');
    ref.setInput('lead', 'Test lead');
    ref.setInput('body', 'Test body');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders kicker, lead, and body', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.page-intro__kicker')?.textContent).toBe('// test kicker');
    expect(el.querySelector('.page-intro__lead')?.textContent).toBe('Test lead');
    expect(el.querySelector('.page-intro__body')?.textContent).toBe('Test body');
  });

  it('renders stats when provided', () => {
    ref.setInput('stats', [{ value: '9', label: 'Projects' }]);
    fixture.detectChanges();
    const statEls = fixture.nativeElement.querySelectorAll('.page-intro__stat');
    expect(statEls.length).toBe(1);
    expect(statEls[0].querySelector('.page-intro__stat-value')?.textContent).toBe('9');
    expect(statEls[0].querySelector('.page-intro__stat-label')?.textContent).toBe('Projects');
  });

  it('hides stats section when stats is empty', () => {
    ref.setInput('stats', []);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.page-intro__stats')).toBeNull();
  });
});
