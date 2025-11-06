// typescript
import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { NeatGradient } from '@firecms/neat';
import { config } from '../../config/neat-config';

@Component({
  selector: 'app-neat',
  templateUrl: './neat.html',
  styleUrls: ['./neat.scss']
})
export class NeatComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gradientCanvas') gradientCanvas!: ElementRef<HTMLCanvasElement>;
  private neat?: NeatGradient;
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return; // avoid WebGL/DOM calls during SSR

    const el = this.gradientCanvas?.nativeElement;
    if (!el) {
      console.error('Canvas not found: #gradient');
      return;
    }

    // create gradient now that the canvas exists
    this.neat = new NeatGradient({
      ref: el,
      ...config,
    });

    // optional runtime tweaks
    this.neat.speed = config.speed ?? 4;
  }

  ngOnDestroy(): void {
    this.neat?.destroy();
  }
}
