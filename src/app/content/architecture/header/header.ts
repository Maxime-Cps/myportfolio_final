import { Component, OnInit, signal, computed, PLATFORM_ID, inject, HostListener } from '@angular/core';
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
export class Header implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'header-animation-played';
  private readonly translationService = inject(TranslationService);
  readonly mobileMenu = inject(MobileMenuService);

  showAnimation = signal(false);
  currentLang = computed(() => this.translationService.lang());
  scrollProgress = signal(0);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const hasPlayed = sessionStorage.getItem(this.STORAGE_KEY);
      if (!hasPlayed) {
        this.showAnimation.set(true);
        sessionStorage.setItem(this.STORAGE_KEY, 'true');
      }
    }
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
}
