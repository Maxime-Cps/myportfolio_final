import { Component, OnInit, OnDestroy, signal, computed, PLATFORM_ID, inject, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { NavigationContainer } from '../../../tools/navigation-container/navigation-container';
import { TranslationService } from '../../../core/services/translation.service';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { MobileMenuService } from '../../../core/services/mobile-menu.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, NavigationContainer, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'header-animation-played';
  private readonly translationService = inject(TranslationService);
  readonly mobileMenu = inject(MobileMenuService);

  showAnimation = signal(false);
  currentLang = computed(() => this.translationService.lang());
  scrollProgress = signal(0);

  showEasterEgg = signal(false);
  private p5Instance: { remove: () => void } | null = null;
  private logoClickCount = 0;
  private clickResetTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const hasPlayed = sessionStorage.getItem(this.STORAGE_KEY);
      if (!hasPlayed) {
        this.showAnimation.set(true);
        sessionStorage.setItem(this.STORAGE_KEY, 'true');
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyP5();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress.set(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
  }

  toggleLanguage(): void {
    this.translationService.toggleLanguage();
  }

  onLogoClick(): void {
    this.logoClickCount++;
    if (this.clickResetTimer) clearTimeout(this.clickResetTimer);
    this.clickResetTimer = setTimeout(() => { this.logoClickCount = 0; }, 2000);
    if (this.logoClickCount >= 3) {
      this.logoClickCount = 0;
      if (this.clickResetTimer) clearTimeout(this.clickResetTimer);
      this.openEasterEgg();
    }
  }

  private openEasterEgg(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.showEasterEgg.set(true);
    this.loadP5ThenInit();
  }

  private loadP5ThenInit(): void {
    const win = window as unknown as Record<string, unknown>;
    if (win['p5']) { this.initSketch(); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js';
    script.onload = () => this.initSketch();
    document.head.appendChild(script);
  }

  private initSketch(): void {
    setTimeout(() => {
      const container = document.getElementById('music-egg-canvas');
      if (!container) return;
      this.destroyP5();

      type P5Constructor = new (sketch: (p: any) => void, el: HTMLElement) => { remove: () => void };
      const P5 = (window as unknown as Record<string, unknown>)['p5'] as P5Constructor;

      this.p5Instance = new P5((p: any) => {
        const NUM_BARS = 90;
        const INNER_R = 54;
        const MAX_BAR = 78;

        p.setup = () => {
          p.createCanvas(320, 320);
          p.strokeCap(p.ROUND);
        };

        p.draw = () => {
          p.background(12, 12, 12);
          p.translate(p.width / 2, p.height / 2);

          const t = p.millis() / 1000;

          // Spin the whole record slowly
          p.rotate(t * 0.06);

          // — Vinyl grooves —
          p.noFill();
          for (let r = 10; r < INNER_R - 3; r += 4.5) {
            const a = p.map(r, 10, INNER_R - 3, 18, 50);
            p.stroke(255, 255, 255, a);
            p.strokeWeight(0.5);
            p.ellipse(0, 0, r * 2, r * 2);
          }

          // — Spectrum bars —
          for (let i = 0; i < NUM_BARS; i++) {
            const frac = i / NUM_BARS;
            const angle = frac * Math.PI * 2;

            // Multi-freq interference — irrational ratios avoid mechanical repeats
            const amp =
              Math.abs(Math.sin(frac * Math.PI * 2 * 2.71 + t * 1.9)) * 0.32 +
              Math.abs(Math.sin(frac * Math.PI * 2 * 5.37 + t * 3.2)) * 0.24 +
              Math.abs(Math.sin(frac * Math.PI * 2 * 1.13 + t * 0.85)) * 0.26 +
              Math.abs(Math.sin(frac * Math.PI * 2 * 10.1 + t * 5.1)) * 0.18;

            const barLen = amp * MAX_BAR + 4;

            // Orange → bright salmon, dims on short bars
            p.stroke(
              140 + amp * 115,
              38 + amp * 88,
              12 + amp * 68,
              100 + amp * 155,
            );
            p.strokeWeight(2.4);

            p.line(
              Math.cos(angle) * (INNER_R + 2), Math.sin(angle) * (INNER_R + 2),
              Math.cos(angle) * (INNER_R + barLen), Math.sin(angle) * (INNER_R + barLen),
            );
          }

          // — Center label dot —
          p.noStroke();
          p.fill(235, 89, 47);
          p.ellipse(0, 0, 22, 22);

          // — Spindle hole —
          p.fill(12, 12, 12);
          p.ellipse(0, 0, 6, 6);
        };
      }, container);
    }, 80);
  }

  private destroyP5(): void {
    if (this.p5Instance) { this.p5Instance.remove(); this.p5Instance = null; }
  }

  closeEasterEgg(): void {
    this.showEasterEgg.set(false);
    this.destroyP5();
  }
}
