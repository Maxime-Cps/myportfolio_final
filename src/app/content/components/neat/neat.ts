// typescript
import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, Inject, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { NeatGradient } from '@firecms/neat';
import { config } from '../../../config/neat-config';

@Component({
  selector: 'app-neat',
  templateUrl: './neat.html',
  styleUrls: ['./neat.scss']
})
export class NeatComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gradientCanvas') gradientCanvas!: ElementRef<HTMLCanvasElement>;
  private neat?: NeatGradient;
  private isBrowser = false;
  private runSpeed = config.speed ?? 4;
  private reducedMotion = false;
  private onVisibility = () => {
    if (!this.neat) return;
    // Stop advancing the animation while the tab is hidden to save the main thread.
    this.neat.speed = document.hidden || this.reducedMotion ? 0 : this.runSpeed;
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return; // avoid WebGL/DOM calls during SSR

    const el = this.gradientCanvas?.nativeElement;
    if (!el) {
      console.error('Canvas not found: #gradient');
      return;
    }

    // Respect users who asked for less motion: render a single static frame.
    this.reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    // Run the WebGL render loop OUTSIDE Angular's zone so its per-frame
    // requestAnimationFrame doesn't trigger change detection or keep the app
    // from stabilizing (fixes NG0506 + cuts main-thread / TBT cost).
    this.zone.runOutsideAngular(() => {
      this.neat = new NeatGradient({
        ref: el,
        ...config,
      });

      // runtime tweaks: pause when reduced-motion is requested
      this.neat.speed = this.reducedMotion ? 0 : this.runSpeed;

      document.addEventListener('visibilitychange', this.onVisibility);
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.neat?.destroy();
  }
}
