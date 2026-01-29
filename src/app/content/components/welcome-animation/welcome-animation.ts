import { Component, OnInit, signal, PLATFORM_ID, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-welcome-animation',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './welcome-animation.html',
  styleUrl: './welcome-animation.scss'
})
export class WelcomeAnimation implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'welcome-animation-played';

  showAnimation = signal(false);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const hasPlayed = sessionStorage.getItem(this.STORAGE_KEY);
      if (!hasPlayed) {
        this.showAnimation.set(true);
        sessionStorage.setItem(this.STORAGE_KEY, 'true');
      }
    }
  }
}
