import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  inject,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NeatGradient } from '@firecms/neat';
import { config } from '../../../config/neat-config';

@Component({
  selector: 'app-neat',
  templateUrl: './neat.html',
  styleUrls: ['./neat.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeatComponent implements AfterViewInit, OnDestroy {
  private readonly gradientCanvas = viewChild<ElementRef<HTMLCanvasElement>>('gradientCanvas');
  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);

  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly runSpeed = config.speed ?? 4;
  private neat?: NeatGradient;
  private reducedMotion = false;

  private readonly onVisibility = (): void => {
    if (!this.neat) return;
    // Freeze the animation while the tab is hidden to spare the main thread.
    this.neat.speed = document.hidden || this.reducedMotion ? 0 : this.runSpeed;
  };

  ngAfterViewInit(): void {
    if (!this.isBrowser) return; // avoid WebGL/DOM calls during SSR

    const el = this.gradientCanvas()?.nativeElement;
    if (!el) {
      console.error('Canvas not found: #gradient');
      return;
    }

    this.reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    // Run the WebGL render loop OUTSIDE Angular's zone so its per-frame
    // requestAnimationFrame never triggers change detection nor blocks
    // hydration stability (fixes NG0506 + cuts main-thread cost).
    this.zone.runOutsideAngular(() => {
      this.neat = new NeatGradient({ ref: el, ...config });
      this.neat.speed = this.reducedMotion ? 0 : this.runSpeed;
      document.addEventListener('visibilitychange', this.onVisibility);
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.neat?.destroy();
  }
}
