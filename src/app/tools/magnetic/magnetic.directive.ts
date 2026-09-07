import {
  afterNextRender,
  booleanAttribute,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  NgZone,
  numberAttribute,
} from '@angular/core';

/**
 * Tracks the pointer over the host element and exposes its position as CSS
 * variables, so stylesheets can draw a cursor-following spotlight (and,
 * optionally, a 3D tilt) without any of that logic leaking into templates.
 *
 * Variables written on the host:
 *   --pointer-x / --pointer-y : cursor position, in px from the element's top-left
 *   --tilt-x    / --tilt-y    : rotation in deg (only when `appMagneticTilt` is set)
 *
 * The `is-magnetic` class is added only once tracking is actually live, which
 * lets the styles stay dormant on touch devices and under reduced motion.
 * Consume all of it through the `spotlight` / `tilt` mixins in `styles/_motion.scss`.
 */
@Directive({
  selector: '[appMagnetic]',
})
export class MagneticDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  /** Adds a 3D tilt on top of the spotlight. */
  readonly tilt = input(false, { alias: 'appMagneticTilt', transform: booleanAttribute });

  /** Maximum tilt angle in degrees, reached at the edges of the element. */
  readonly maxTilt = input(6, { alias: 'appMagneticMaxTilt', transform: numberAttribute });

  private frame = 0;
  private pointerX = 0;
  private pointerY = 0;

  constructor() {
    afterNextRender(() => this.track());
  }

  private track(): void {
    // Purely decorative: skip touch/pen devices, where there is no cursor to follow,
    // and anyone who asked for less motion.
    const hasCursor = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const wantsCalm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hasCursor || wantsCalm) {
      return;
    }

    const element = this.host.nativeElement;
    element.classList.add('is-magnetic');

    // Pointer moves fire far too often to be worth a change-detection pass:
    // the directive only writes CSS variables, which Angular does not need to know about.
    this.zone.runOutsideAngular(() => {
      element.addEventListener('pointermove', this.onPointerMove, { passive: true });
      element.addEventListener('pointerleave', this.onPointerLeave, { passive: true });
    });

    this.destroyRef.onDestroy(() => {
      element.removeEventListener('pointermove', this.onPointerMove);
      element.removeEventListener('pointerleave', this.onPointerLeave);
      cancelAnimationFrame(this.frame);
    });
  }

  private readonly onPointerMove = (event: PointerEvent): void => {
    this.pointerX = event.clientX;
    this.pointerY = event.clientY;
    // Coalesce bursts of moves into a single write per frame.
    this.frame ||= requestAnimationFrame(this.paint);
  };

  private readonly onPointerLeave = (): void => {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    const style = this.host.nativeElement.style;
    style.removeProperty('--tilt-x');
    style.removeProperty('--tilt-y');
  };

  private readonly paint = (): void => {
    this.frame = 0;

    const element = this.host.nativeElement;
    const bounds = element.getBoundingClientRect();
    const x = this.pointerX - bounds.left;
    const y = this.pointerY - bounds.top;

    element.style.setProperty('--pointer-x', `${x}px`);
    element.style.setProperty('--pointer-y', `${y}px`);

    if (!this.tilt() || !bounds.width || !bounds.height) {
      return;
    }

    // -1 at one edge, +1 at the other. Y is inverted so the card leans towards the cursor.
    const offsetX = (x / bounds.width) * 2 - 1;
    const offsetY = (y / bounds.height) * 2 - 1;
    const max = this.maxTilt();

    element.style.setProperty('--tilt-y', `${offsetX * max}deg`);
    element.style.setProperty('--tilt-x', `${-offsetY * max}deg`);
  };
}
