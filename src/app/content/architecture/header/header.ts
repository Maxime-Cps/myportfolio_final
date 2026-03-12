import { Component, OnInit, signal, computed, PLATFORM_ID, inject, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { NavigationContainer } from '../../../tools/navigation-container/navigation-container';
import { TranslationService } from '../../../core/services/translation.service';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

interface ConfettiPiece {
  left: string;
  delay: string;
  duration: string;
  color: string;
  size: string;
  rotation: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, NavigationContainer, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'header-animation-played';
  private readonly translationService = inject(TranslationService);

  showAnimation = signal(false);
  currentLang = computed(() => this.translationService.lang());
  scrollProgress = signal(0);

  // Easter egg
  private logoClickCount = 0;
  private clickResetTimer: ReturnType<typeof setTimeout> | null = null;
  showEasterEgg = signal(false);
  confettiPieces = signal<ConfettiPiece[]>([]);

  readonly easterEggStats = [
    { emoji: '☕', label: 'Cafés bus en codant', value: '1 337' },
    { emoji: '🐛', label: 'Bugs résolus', value: '404' },
    { emoji: '🌙', label: 'Nuits blanches', value: '42' },
    { emoji: '💻', label: 'Lignes de code écrites', value: '99 999+' },
  ];

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

  onLogoClick(): void {
    this.logoClickCount++;

    if (this.clickResetTimer) clearTimeout(this.clickResetTimer);
    this.clickResetTimer = setTimeout(() => { this.logoClickCount = 0; }, 2000);

    if (this.logoClickCount >= 5) {
      this.logoClickCount = 0;
      if (this.clickResetTimer) clearTimeout(this.clickResetTimer);
      this.triggerEasterEgg();
    }
  }

  private triggerEasterEgg(): void {
    const colors = ['#eb592f', 'rgba(255,156,127,0.9)', '#3b82f6', '#22c55e', '#f59e0b', '#a855f7', '#F5F5F5'];
    const pieces: ConfettiPiece[] = Array.from({ length: 100 }, () => ({
      left: Math.random() * 100 + '%',
      delay: Math.random() * 1.5 + 's',
      duration: (Math.random() * 2 + 2.5) + 's',
      color: colors[Math.floor(Math.random() * colors.length)],
      size: (Math.random() * 8 + 6) + 'px',
      rotation: Math.random() * 360 + 'deg',
    }));

    this.confettiPieces.set(pieces);
    this.showEasterEgg.set(true);

    setTimeout(() => {
      this.showEasterEgg.set(false);
      this.confettiPieces.set([]);
    }, 9000);
  }

  closeEasterEgg(): void {
    this.showEasterEgg.set(false);
    this.confettiPieces.set([]);
  }
}
