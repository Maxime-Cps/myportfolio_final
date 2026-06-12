import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { Hobbies } from './hobbies';

describe('Hobbies', () => {
  let component: Hobbies;
  let fixture: ComponentFixture<Hobbies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hobbies],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hobbies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders one tile per hobby', () => {
    const tiles = fixture.nativeElement.querySelectorAll('.hobby-tile');
    expect(tiles.length).toBe(component.hobbies().length);
  });

  it('marks the first tile as featured', () => {
    const first = fixture.nativeElement.querySelector('.hobby-tile');
    expect(first.classList).toContain('hobby-tile--featured');
  });

  it('renders an autoplay muted video for the golf card', () => {
    const video: HTMLVideoElement | null = fixture.nativeElement.querySelector('.hobby-tile video');
    expect(video).toBeTruthy();
    expect(video!.muted).toBeTrue();
    expect(video!.autoplay).toBeTrue();
  });

  it('falls back to an icon when a hobby has no media', () => {
    const icon = fixture.nativeElement.querySelector('.hobby-tile__icon');
    expect(icon).toBeTruthy();
  });
});
