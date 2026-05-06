import { Component, OnInit, OnDestroy, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonLinks } from '../../../../tools/button-links/button-links';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-home',
  imports: [
    ButtonLinks,
    NgOptimizedImage,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'home-animation-played';
  readonly featuredGithubUrl = 'https://github.com/Maxime-Cps/StrasTaRoute_Web';
  private readonly ROLES = [
    'Alternant Angular · Java · .NET chez CAPCOD',
    'Front, Back et DevOps',
    'DJ, golfeur, fan de F1 et de GT3',
  ];

  openFeaturedGithub(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.open(this.featuredGithubUrl, '_blank', 'noopener,noreferrer');
    }
  }

  showAnimation = signal(false);
  typewriterText = signal('');
  typewriterDone = signal(false);

  private typewriterTimer: ReturnType<typeof setTimeout> | null = null;
  private roleIndex = 0;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const hasPlayed = sessionStorage.getItem(this.STORAGE_KEY);
      if (!hasPlayed) {
        this.showAnimation.set(true);
        sessionStorage.setItem(this.STORAGE_KEY, 'true');
      }
      this.startTypewriter();
    }
  }

  ngOnDestroy(): void {
    if (this.typewriterTimer) clearTimeout(this.typewriterTimer);
  }

  private startTypewriter(): void {
    this.typewriterTimer = setTimeout(() => this.typeRole(), 800);
  }

  private typeRole(): void {
    const role = this.ROLES[this.roleIndex];
    let charIndex = 0;

    this.typewriterDone.set(false);

    const type = () => {
      if (charIndex < role.length) {
        this.typewriterText.set(role.slice(0, charIndex + 1));
        charIndex++;
        this.typewriterTimer = setTimeout(type, 55);
      } else {
        this.typewriterDone.set(true);
        this.typewriterTimer = setTimeout(() => this.eraseRole(), 2000);
      }
    };

    type();
  }

  private eraseRole(): void {
    const current = this.typewriterText();
    let charIndex = current.length;

    this.typewriterDone.set(false);

    const erase = () => {
      if (charIndex > 0) {
        this.typewriterText.set(current.slice(0, charIndex - 1));
        charIndex--;
        this.typewriterTimer = setTimeout(erase, 30);
      } else {
        this.roleIndex = (this.roleIndex + 1) % this.ROLES.length;
        this.typewriterTimer = setTimeout(() => this.typeRole(), 400);
      }
    };

    erase();
  }
}
