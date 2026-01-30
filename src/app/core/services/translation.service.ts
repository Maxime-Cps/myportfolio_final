import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export type Language = 'fr' | 'en';

type TranslationValue = string | string[] | TranslationObject;
interface TranslationObject {
  [key: string]: TranslationValue;
}

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly http = inject(HttpClient);
  private readonly STORAGE_KEY = 'portfolio-language';

  private currentLang = signal<Language>('fr');
  private translations = signal<TranslationObject>({});
  private isLoaded = signal(false);

  readonly lang = computed(() => this.currentLang());
  readonly loaded = computed(() => this.isLoaded());

  constructor() {
    this.initLanguage();
  }

  private async initLanguage(): Promise<void> {
    let savedLang: Language = 'fr';

    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored === 'en' || stored === 'fr') {
        savedLang = stored;
      }
    }

    await this.loadTranslations(savedLang);
  }

  async setLanguage(lang: Language): Promise<void> {
    if (lang === this.currentLang()) return;

    await this.loadTranslations(lang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, lang);
    }
  }

  private async loadTranslations(lang: Language): Promise<void> {
    try {
      const data = await firstValueFrom(
        this.http.get<TranslationObject>(`/assets/i18n/${lang}.json`)
      );
      this.translations.set(data);
      this.currentLang.set(lang);
      this.isLoaded.set(true);
    } catch (error) {
      console.error(`Failed to load translations for ${lang}`, error);
      if (lang !== 'fr') {
        await this.loadTranslations('fr');
      }
    }
  }

  get(key: string): TranslationValue {
    const keys = key.split('.');
    let value: TranslationValue = this.translations();

    for (const k of keys) {
      if (value && typeof value === 'object' && !Array.isArray(value) && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return value;
  }

  toggleLanguage(): void {
    const newLang: Language = this.currentLang() === 'fr' ? 'en' : 'fr';
    this.setLanguage(newLang);
  }

  getCurrentLang(): Language {
    return this.currentLang();
  }
}
