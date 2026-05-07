import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HobbyCarousel } from './hobby-carousel';

describe('HobbyCarousel', () => {
  let component: HobbyCarousel;
  let fixture: ComponentFixture<HobbyCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HobbyCarousel]
    }).compileComponents();
    fixture = TestBed.createComponent(HobbyCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should start at index 0', () => {
    expect(component.currentIndex()).toBe(0);
  });

  it('prev() does not go below 0', () => {
    component.prev();
    expect(component.currentIndex()).toBe(0);
  });

  it('next() advances index', () => {
    fixture.componentRef.setInput('media', [
      { type: 'image', src: 'a.jpg' },
      { type: 'image', src: 'b.jpg' }
    ]);
    component.next();
    expect(component.currentIndex()).toBe(1);
  });

  it('next() does not exceed media.length - 1', () => {
    fixture.componentRef.setInput('media', [{ type: 'image', src: 'a.jpg' }]);
    component.next();
    expect(component.currentIndex()).toBe(0);
  });

  it('showControls is false with 0 items', () => {
    expect(component.showControls()).toBeFalsy();
  });

  it('showControls is false with 1 item', () => {
    fixture.componentRef.setInput('media', [{ type: 'image', src: 'a.jpg' }]);
    expect(component.showControls()).toBeFalsy();
  });

  it('showControls is true with 2+ items', () => {
    fixture.componentRef.setInput('media', [
      { type: 'image', src: 'a.jpg' },
      { type: 'image', src: 'b.jpg' }
    ]);
    expect(component.showControls()).toBeTruthy();
  });

  it('hasMedia is false with empty array', () => {
    expect(component.hasMedia()).toBeFalsy();
  });

  it('hasMedia is true when media provided', () => {
    fixture.componentRef.setInput('media', [{ type: 'image', src: 'a.jpg' }]);
    expect(component.hasMedia()).toBeTruthy();
  });

  it('badgeLabel pads single-digit cardIndex', () => {
    fixture.componentRef.setInput('cardIndex', 0);
    expect(component.badgeLabel()).toBe('01');
  });

  it('badgeLabel does not pad double-digit cardIndex', () => {
    fixture.componentRef.setInput('cardIndex', 9);
    expect(component.badgeLabel()).toBe('10');
  });

  it('trackOffset reflects currentIndex', () => {
    fixture.componentRef.setInput('media', [
      { type: 'image', src: 'a.jpg' },
      { type: 'image', src: 'b.jpg' }
    ]);
    component.next();
    expect(component.trackOffset()).toBe('translateX(-100%)');
  });

  it('onPointerUp with swipe right (delta > 50) calls prev()', () => {
    fixture.componentRef.setInput('media', [
      { type: 'image', src: 'a.jpg' },
      { type: 'image', src: 'b.jpg' }
    ]);
    component.next();
    spyOn(component, 'prev').and.callThrough();
    component.onPointerDown({ clientX: 40 } as PointerEvent);
    component.onPointerUp({ clientX: 100 } as PointerEvent);
    expect(component.prev).toHaveBeenCalled();
  });

  it('onPointerUp with swipe left (delta < -50) calls next()', () => {
    fixture.componentRef.setInput('media', [
      { type: 'image', src: 'a.jpg' },
      { type: 'image', src: 'b.jpg' }
    ]);
    spyOn(component, 'next').and.callThrough();
    component.onPointerDown({ clientX: 100 } as PointerEvent);
    component.onPointerUp({ clientX: 20 } as PointerEvent);
    expect(component.next).toHaveBeenCalled();
  });

  it('getSafeIcon returns a truthy SafeHtml value', () => {
    const result = component.getSafeIcon('<svg>icon</svg>');
    expect(result).toBeTruthy();
  });
});
