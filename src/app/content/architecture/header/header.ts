import { Component, OnInit, signal, PLATFORM_ID, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { NavigationContainer } from '../../../tools/navigation-container/navigation-container';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NavigationContainer
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'header-animation-played';

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

  protected readonly RouterLink = RouterLink;
}
