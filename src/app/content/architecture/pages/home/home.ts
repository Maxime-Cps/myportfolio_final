import { Component, OnInit, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ButtonLinks } from '../../../../tools/button-links/button-links';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    ButtonLinks,
    NgOptimizedImage,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'home-animation-played';

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
