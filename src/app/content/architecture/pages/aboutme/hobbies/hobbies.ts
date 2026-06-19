import { Component, inject, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslationService } from '../../../../../core/services/translation.service';
import { IHobbyConfig } from '../../../../../core/models/hobby.interface';

@Component({
  selector: 'app-hobbies',
  imports: [],
  templateUrl: './hobbies.html',
  styleUrl: './hobbies.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Hobbies {
  private readonly translationService = inject(TranslationService);
  private readonly sanitizer = inject(DomSanitizer);

  private readonly hobbyConfigs: IHobbyConfig[] = [
    {
      nameKey: 'hobbies.golf.name',
      descriptionKey: 'hobbies.golf.description',
      media: [{ type: 'video', src: 'assets/img/golf-2.MOV', mode: 'cover', poster: 'assets/img/golf-1.jpg', alt: 'Swing de golf' }],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-land-plot-icon lucide-land-plot"><path d="m12 8 6-3-6-3v10"/><path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12"/><path d="m6.49 12.85 11.02 6.3"/><path d="M17.51 12.85 6.5 19.15"/></svg>`,
      tags: ['Sport', 'Competition', 'Precision']
    },
    {
      nameKey: 'hobbies.music.name',
      descriptionKey: 'hobbies.music.description',
      media: [{ type: 'image', src: 'assets/img/dj-1.JPG', mode: 'cover', alt: 'Maxime en DJ set' }],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
      </svg>`,
      tags: ['DJ', 'Production', 'Electro'],
      links: [
        {
          label: 'SoundCloud',
          url: 'https://soundcloud.com/messmocky/tracks',
          icon: `<img src="assets/img/soundcloud.png" alt="SoundCloud" width="48" height="48"/>`
        },
      ]
    },
    {
      nameKey: 'hobbies.motorsport.name',
      descriptionKey: 'hobbies.motorsport.description',
      media: [{ type: 'image', src: 'assets/img/kart.webp', mode: 'cover', alt: 'Maxime en course de karting' }],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
      </svg>`,
      tags: ['F1', 'Endurance', 'Simracing']
    },
    {
      nameKey: 'hobbies.association.name',
      descriptionKey: 'hobbies.association.description',
      media: [{ type: 'image', src: 'assets/img/core.png', mode: 'contain', alt: 'Logo association CORE' }],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>`,
      tags: ['ARIANE', 'CORE', 'Events']
    }
  ];

  expanded = signal<Set<number>>(new Set());

  hobbies = computed(() => {
    return this.hobbyConfigs.map((config, index, arr) => {
      const name = this.translationService.get(config.nameKey);
      const description = this.translationService.get(config.descriptionKey);
      return {
        name: typeof name === 'string' ? name : config.nameKey,
        description: typeof description === 'string' ? description : config.descriptionKey,
        icon: config.icon,
        media: config.media?.[0] ?? null,
        links: config.links,
        tags: config.tags,
        featured: index === 0,
        banner: index === arr.length - 1,
        index: String(index + 1).padStart(2, '0')
      };
    });
  });

  isExpanded(i: number): boolean {
    return this.expanded().has(i);
  }

  toggle(i: number): void {
    const next = new Set(this.expanded());
    if (next.has(i)) {
      next.delete(i);
    } else {
      next.add(i);
    }
    this.expanded.set(next);
  }

  getSafeIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
