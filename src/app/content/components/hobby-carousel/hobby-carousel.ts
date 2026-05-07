import { Component, computed, input, signal, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IHobbyMedia } from '../../../core/models/hobby.interface';

@Component({
  selector: 'app-hobby-carousel',
  imports: [],
  templateUrl: './hobby-carousel.html',
  styleUrl: './hobby-carousel.scss'
})
export class HobbyCarousel {
  private readonly sanitizer = inject(DomSanitizer);

  media = input<IHobbyMedia[]>([]);
  icon = input<string>('');
  cardIndex = input<number>(0);

  currentIndex = signal(0);

  hasMedia = computed(() => this.media().length > 0);
  showControls = computed(() => this.media().length > 1);
  trackOffset = computed(() => `translateX(-${this.currentIndex() * 100}%)`);
  badgeLabel = computed(() => {
    const n = this.cardIndex() + 1;
    return n < 10 ? `0${n}` : `${n}`;
  });

  private startX = 0;

  prev(): void {
    this.currentIndex.update(i => Math.max(0, i - 1));
  }

  next(): void {
    this.currentIndex.update(i => Math.min(this.media().length - 1, i + 1));
  }

  onPointerDown(e: PointerEvent): void {
    this.startX = e.clientX;
  }

  onPointerUp(e: PointerEvent): void {
    const delta = e.clientX - this.startX;
    if (delta > 50) this.prev();
    else if (delta < -50) this.next();
  }

  getSafeIcon(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
