# Hobby Card Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single static image in each hobby card with a swipeable carousel supporting multiple images and local videos.

**Architecture:** New standalone `HobbyCarousel` component owns all carousel logic (signals-based index, pointer swipe, arrows, dots). Parent `Hobbies` component passes `media[]`, `icon`, and `cardIndex` inputs. Data model extended with `IHobbyMedia` replacing the old `image`/`imageMode` fields.

**Tech Stack:** Angular 20 signals, standalone components, SCSS, Karma/Jasmine for tests.

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `src/app/core/models/hobby.interface.ts` | Add `IHobbyMedia`, update `IHobbyConfig` |
| Create | `src/app/content/components/hobby-carousel/hobby-carousel.ts` | Carousel logic |
| Create | `src/app/content/components/hobby-carousel/hobby-carousel.html` | Carousel template |
| Create | `src/app/content/components/hobby-carousel/hobby-carousel.scss` | Carousel styles |
| Create | `src/app/content/components/hobby-carousel/hobby-carousel.spec.ts` | Unit tests |
| Modify | `src/app/content/architecture/pages/aboutme/hobbies/hobbies.ts` | Migrate data, import carousel |
| Modify | `src/app/content/architecture/pages/aboutme/hobbies/hobbies.html` | Use `<app-hobby-carousel>` |
| Modify | `src/app/content/architecture/pages/aboutme/hobbies/hobbies.scss` | Remove moved styles |

---

### Task 1: Update data model

**Files:**
- Modify: `src/app/core/models/hobby.interface.ts`

- [ ] **Step 1: Replace file content**

```typescript
export interface IHobbyLink {
  label: string;
  url: string;
  icon: string;
}

export interface IHobbyMedia {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  mode?: 'cover' | 'contain';
}

export interface IHobbyConfig {
  nameKey: string;
  descriptionKey: string;
  icon: string;
  media?: IHobbyMedia[];
  links?: IHobbyLink[];
  tags: string[];
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx ng build --configuration development 2>&1 | grep -i error
```

Expected: errors about `image`/`imageMode` in `hobbies.ts` (those will be fixed in Task 6). No errors in other files.

- [ ] **Step 3: Commit**

```bash
git add src/app/core/models/hobby.interface.ts
git commit -m "feat: add IHobbyMedia to hobby interface, replace image/imageMode with media array"
```

---

### Task 2: Write failing HobbyCarousel tests

**Files:**
- Create: `src/app/content/components/hobby-carousel/hobby-carousel.spec.ts`

- [ ] **Step 1: Create test file**

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HobbyCarousel } from './hobby-carousel';

describe('HobbyCarousel', () => {
  let component: HobbyCarousel;
  let fixture: ComponentFixture<HobbyCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HobbyCarousel]
    }).compileComponents();
    fixture = TestBed.createComponent(HobbyCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should start at index 0', () => {
    expect(component.currentIndex()).toBe(0);
  });

  it('prev() does not go below 0', () => {
    component.prev();
    expect(component.currentIndex()).toBe(0);
  });

  it('next() advances index', () => {
    fixture.componentRef.setInput('media', [
      { type: 'image', src: 'a.jpg' },
      { type: 'image', src: 'b.jpg' }
    ]);
    component.next();
    expect(component.currentIndex()).toBe(1);
  });

  it('next() does not exceed media.length - 1', () => {
    fixture.componentRef.setInput('media', [{ type: 'image', src: 'a.jpg' }]);
    component.next();
    expect(component.currentIndex()).toBe(0);
  });

  it('showControls is false with 0 items', () => {
    expect(component.showControls()).toBeFalsy();
  });

  it('showControls is false with 1 item', () => {
    fixture.componentRef.setInput('media', [{ type: 'image', src: 'a.jpg' }]);
    expect(component.showControls()).toBeFalsy();
  });

  it('showControls is true with 2+ items', () => {
    fixture.componentRef.setInput('media', [
      { type: 'image', src: 'a.jpg' },
      { type: 'image', src: 'b.jpg' }
    ]);
    expect(component.showControls()).toBeTruthy();
  });

  it('hasMedia is false with empty array', () => {
    expect(component.hasMedia()).toBeFalsy();
  });

  it('hasMedia is true when media provided', () => {
    fixture.componentRef.setInput('media', [{ type: 'image', src: 'a.jpg' }]);
    expect(component.hasMedia()).toBeTruthy();
  });

  it('badgeLabel pads single-digit cardIndex', () => {
    fixture.componentRef.setInput('cardIndex', 0);
    expect(component.badgeLabel()).toBe('01');
  });

  it('badgeLabel does not pad double-digit cardIndex', () => {
    fixture.componentRef.setInput('cardIndex', 9);
    expect(component.badgeLabel()).toBe('10');
  });

  it('trackOffset reflects currentIndex', () => {
    fixture.componentRef.setInput('media', [
      { type: 'image', src: 'a.jpg' },
      { type: 'image', src: 'b.jpg' }
    ]);
    component.next();
    expect(component.trackOffset()).toBe('translateX(-100%)');
  });
});
```

- [ ] **Step 2: Run tests — expect failure (component not yet created)**

```bash
npm test -- --include='**/hobby-carousel.spec.ts' 2>&1 | tail -20
```

Expected: error `Cannot find module './hobby-carousel'`

---

### Task 3: Implement HobbyCarousel component logic

**Files:**
- Create: `src/app/content/components/hobby-carousel/hobby-carousel.ts`

- [ ] **Step 1: Create component class**

```typescript
import { Component, computed, input, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { inject } from '@angular/core';
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
```

- [ ] **Step 2: Create placeholder template (needed for compilation)**

Create `src/app/content/components/hobby-carousel/hobby-carousel.html` with:

```html
<div class="carousel-wrapper"></div>
```

- [ ] **Step 3: Create placeholder styles**

Create `src/app/content/components/hobby-carousel/hobby-carousel.scss` with:

```scss
.carousel-wrapper { position: relative; }
```

- [ ] **Step 4: Run tests — expect pass**

```bash
npm test -- --include='**/hobby-carousel.spec.ts' 2>&1 | tail -20
```

Expected: all 11 specs PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/content/components/hobby-carousel/
git commit -m "feat: add HobbyCarousel component with signals-based navigation"
```

---

### Task 4: Write HobbyCarousel template

**Files:**
- Modify: `src/app/content/components/hobby-carousel/hobby-carousel.html`

- [ ] **Step 1: Replace placeholder with full template**

```html
<div
  class="carousel-wrapper"
  (pointerdown)="onPointerDown($event)"
  (pointerup)="onPointerUp($event)">

  @if (hasMedia()) {
    <div class="carousel-track" [style.transform]="trackOffset()">
      @for (item of media(); track item.src) {
        <div class="carousel-slide" [class.carousel-slide--contain]="item.mode === 'contain'">
          @if (item.type === 'image') {
            <img [src]="item.src" [alt]="item.alt ?? ''" loading="lazy" />
          } @else {
            <video [src]="item.src" controls></video>
          }
        </div>
      }
    </div>
  } @else {
    <div class="carousel-icon" [innerHTML]="getSafeIcon(icon())"></div>
  }

  @if (showControls()) {
    <button class="carousel-arrow carousel-arrow--prev" (click)="prev()" aria-label="Previous">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>
    <button class="carousel-arrow carousel-arrow--next" (click)="next()" aria-label="Next">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>

    <div class="carousel-dots">
      @for (item of media(); track item.src; let i = $index) {
        <span
          class="carousel-dot"
          [class.carousel-dot--active]="i === currentIndex()"
          (click)="currentIndex.set(i)">
        </span>
      }
    </div>
  }

  <span class="hobby-card__index">{{ badgeLabel() }}</span>
</div>
```

- [ ] **Step 2: Verify build compiles**

```bash
npx ng build --configuration development 2>&1 | grep -i error
```

Expected: no errors (hobbies.ts still broken from Task 1 is OK — it will be fixed in Task 6)

- [ ] **Step 3: Commit**

```bash
git add src/app/content/components/hobby-carousel/hobby-carousel.html
git commit -m "feat: add HobbyCarousel template with slides, arrows, dots, and fallback icon"
```

---

### Task 5: Write HobbyCarousel styles

**Files:**
- Modify: `src/app/content/components/hobby-carousel/hobby-carousel.scss`

- [ ] **Step 1: Replace placeholder with full styles**

```scss
@use '../../../../styles.scss' as *;

.carousel-wrapper {
  position: relative;
  width: 100%;
  min-height: 260px;
  background: #0a0a0a;
  overflow: hidden;
  user-select: none;
  touch-action: pan-y;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.5) 100%);
    pointer-events: none;
    z-index: 1;
  }

  @media (max-width: 768px) {
    min-height: 200px;
  }
}

.carousel-track {
  display: flex;
  height: 100%;
  min-height: 260px;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: 768px) {
    min-height: 200px;
  }
}

.carousel-slide {
  flex: 0 0 100%;
  width: 100%;
  min-height: 260px;
  background: #0a0a0a;

  img,
  video {
    width: 100%;
    height: 100%;
    min-height: 260px;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &--contain {
    background: linear-gradient(135deg, rgba(15, 15, 15, 0.95), rgba(30, 20, 15, 0.85));
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.5rem;

    img {
      width: auto;
      max-width: 75%;
      height: auto;
      max-height: 70%;
      min-height: unset;
      object-fit: contain;
    }
  }

  @media (max-width: 768px) {
    min-height: 200px;

    img,
    video {
      min-height: 200px;
    }
  }
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255, 156, 127, 0.25);
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  color: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  transition: border-color 0.2s ease, transform 0.2s ease;
  padding: 0;

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  &:hover {
    border-color: rgba(255, 156, 127, 0.8);
    transform: translateY(-50%) scale(1.1);
  }

  &--prev { left: 0.75rem; }
  &--next { right: 0.75rem; }
}

.carousel-dots {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 3;
}

.carousel-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s ease;

  &--active {
    background: #eb592f;
    transform: scale(1.2);
  }
}

.carousel-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 156, 127, 0.85);
  background: linear-gradient(135deg, rgba(235, 89, 47, 0.18) 0%, rgba(15, 15, 15, 0.85) 100%);

  ::ng-deep svg {
    width: 80px;
    height: 80px;
  }
}

.hobby-card__index {
  position: absolute;
  top: 1rem;
  left: 1.25rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.78rem;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.85);
  z-index: 2;

  &::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 1px;
    background: rgba(255, 156, 127, 0.85);
    margin-right: 0.6rem;
    vertical-align: middle;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/content/components/hobby-carousel/hobby-carousel.scss
git commit -m "feat: add HobbyCarousel styles — arrows, dots, slides, icon fallback"
```

---

### Task 6: Migrate Hobbies component data

**Files:**
- Modify: `src/app/content/architecture/pages/aboutme/hobbies/hobbies.ts`

- [ ] **Step 1: Replace full file**

```typescript
import { Component, inject, computed } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslationService } from '../../../../../core/services/translation.service';
import { IHobbyConfig } from '../../../../../core/models/hobby.interface';
import { HobbyCarousel } from '../../../../../content/components/hobby-carousel/hobby-carousel';

@Component({
  selector: 'app-hobbies',
  imports: [HobbyCarousel],
  templateUrl: './hobbies.html',
  styleUrl: './hobbies.scss'
})
export class Hobbies {
  private readonly translationService = inject(TranslationService);
  private readonly sanitizer = inject(DomSanitizer);

  private hobbyConfigs: IHobbyConfig[] = [
    {
      nameKey: 'hobbies.music.name',
      descriptionKey: 'hobbies.music.description',
      media: [{ type: 'image', src: 'assets/img/messmocky2.PNG', mode: 'cover', alt: 'Messmocky DJ set' }],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
      </svg>`,
      tags: ['DJ', 'Production', 'Electro'],
      links: [
        {
          label: 'SoundCloud',
          url: 'https://soundcloud.com/messmocky/tracks',
          icon: `<img src="assets/img/soundcloud.png" alt="SoundCloud" width="48" height="48"/>`
        }
      ]
    },
    {
      nameKey: 'hobbies.golf.name',
      descriptionKey: 'hobbies.golf.description',
      media: [{ type: 'image', src: 'assets/img/me-golf.jpg', mode: 'cover', alt: 'Golf' }],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-land-plot-icon lucide-land-plot"><path d="m12 8 6-3-6-3v10"/><path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12"/><path d="m6.49 12.85 11.02 6.3"/><path d="M17.51 12.85 6.5 19.15"/></svg>`,
      tags: ['Sport', 'Competition', 'Precision']
    },
    {
      nameKey: 'hobbies.motorsport.name',
      descriptionKey: 'hobbies.motorsport.description',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
      </svg>`,
      tags: ['F1', 'Endurance', 'Simracing']
    },
    {
      nameKey: 'hobbies.association.name',
      descriptionKey: 'hobbies.association.description',
      media: [{ type: 'image', src: 'assets/img/core.png', mode: 'contain', alt: 'CORE association logo' }],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>`,
      tags: ['ARIANE', 'CORE', 'Events']
    }
  ];

  hobbies = computed(() => {
    return this.hobbyConfigs.map(config => {
      const name = this.translationService.get(config.nameKey);
      const description = this.translationService.get(config.descriptionKey);
      return {
        name: typeof name === 'string' ? name : config.nameKey,
        description: typeof description === 'string' ? description : config.descriptionKey,
        icon: config.icon,
        media: config.media ?? [],
        links: config.links,
        tags: config.tags
      };
    });
  });

  getSafeIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
```

- [ ] **Step 2: Verify build**

```bash
npx ng build --configuration development 2>&1 | grep -i error
```

Expected: errors only in `hobbies.html` (template still references `hobby.image` — fixed in Task 7). No TS errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/content/architecture/pages/aboutme/hobbies/hobbies.ts
git commit -m "feat: migrate Hobbies data configs to IHobbyMedia array, import HobbyCarousel"
```

---

### Task 7: Update Hobbies template

**Files:**
- Modify: `src/app/content/architecture/pages/aboutme/hobbies/hobbies.html`

- [ ] **Step 1: Replace full template**

```html
<div class="hobbies-stack">
  @for (hobby of hobbies(); track hobby.name; let i = $index) {
    <article
      class="hobby-card"
      [class.hobby-card--reverse]="i % 2 === 1">
      <div class="hobby-card__visual">
        <app-hobby-carousel
          [media]="hobby.media"
          [icon]="hobby.icon"
          [cardIndex]="i" />
      </div>
      <div class="hobby-card__body">
        <h3 class="hobby-card__name">{{ hobby.name }}</h3>
        <p class="hobby-card__desc">{{ hobby.description }}</p>
        <div class="hobby-card__tags">
          @for (tag of hobby.tags; track tag) {
            <span class="hobby-tag">{{ tag }}</span>
          }
        </div>
        @if (hobby.links) {
          <div class="hobby-card__links">
            @for (link of hobby.links; track link.label) {
              <a [href]="link.url" target="_blank" rel="noopener noreferrer" class="hobby-link" [title]="link.label">
                <span [innerHTML]="getSafeIcon(link.icon)"></span>
              </a>
            }
          </div>
        }
      </div>
    </article>
  }
</div>
```

- [ ] **Step 2: Verify build compiles cleanly**

```bash
npx ng build --configuration development 2>&1 | grep -i error
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/content/architecture/pages/aboutme/hobbies/hobbies.html
git commit -m "feat: use app-hobby-carousel in hobby card template"
```

---

### Task 8: Update Hobbies styles

**Files:**
- Modify: `src/app/content/architecture/pages/aboutme/hobbies/hobbies.scss`

- [ ] **Step 1: Replace full file** (remove styles moved to carousel, add hover pass-through)

```scss
@use '../../../../../../styles.scss' as *;

.hobbies-stack {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
}

.hobby-card {
  display: grid;
  grid-template-columns: 0.85fr 1fr;
  align-items: stretch;
  background: rgba(15, 15, 15, 0.45);
  border: 1px solid rgba(255, 156, 127, 0.2);
  border-radius: 14px;
  overflow: hidden;
  transition:
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.3s ease,
    box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 156, 127, 0.5);
    box-shadow: 0 12px 32px -16px rgba(235, 89, 47, 0.35);

    ::ng-deep .carousel-slide img {
      transform: scale(1.04);
    }
  }

  &--reverse {
    .hobby-card__visual { order: 2; }
    .hobby-card__body { order: 1; }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    &--reverse {
      .hobby-card__visual { order: 0; }
      .hobby-card__body { order: 0; }
    }
  }
}

.hobby-card__visual {
  position: relative;
  overflow: hidden;
}

.hobby-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.75rem 2rem;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 1.25rem 1.4rem 1.5rem;
  }
}

.hobby-card__name {
  margin: 0;
  font-family: 'Zalando Sans Expanded', sans-serif;
  font-style: italic;
  font-weight: 900;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  color: $white-color;
  letter-spacing: -0.015em;
  line-height: 1;
}

.hobby-card__desc {
  margin: 0;
  color: rgba(245, 245, 245, 0.78);
  font-size: 0.95rem;
  line-height: 1.55;
}

.hobby-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.25rem;
}

.hobby-card__links {
  display: flex;
  gap: 0.85rem;
  margin-top: 0.4rem;
}

.hobby-tag {
  background: transparent;
  border: 1px solid rgba(255, 156, 127, 0.3);
  color: rgba($white-color, 0.78);
  padding: 3px 10px;
  border-radius: 4px;
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.04em;
}

.hobby-link {
  color: $white-color;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: $secondary-color;
    transform: scale(1.1);
  }

  ::ng-deep svg,
  ::ng-deep img {
    width: 28px;
    height: 28px;
  }
}
```

- [ ] **Step 2: Run full build**

```bash
npx ng build --configuration development 2>&1 | grep -i error
```

Expected: no errors

- [ ] **Step 3: Run tests**

```bash
npm test -- --include='**/hobby-carousel.spec.ts' 2>&1 | tail -20
```

Expected: all 11 specs PASS

- [ ] **Step 4: Commit**

```bash
git add src/app/content/architecture/pages/aboutme/hobbies/hobbies.scss
git commit -m "feat: update Hobbies styles — remove moved rules, add carousel hover pass-through"
```

---

### Task 9: Manual verification

- [ ] **Step 1: Start dev server**

```bash
npm start
```

Open `http://localhost:4200/home/aboutme`

- [ ] **Step 2: Verify each hobby card**

Check all 4 cards:
- Music: image visible, badge "01" top-left, no arrows/dots (single media item)
- Golf: image visible, badge "02"
- Motorsport: orange icon fallback visible, badge "03", no arrows/dots
- Association: logo in contain mode visible, badge "04"

- [ ] **Step 3: Verify hover**

Hover over a card with image → card lifts (`translateY(-4px)`), image scales subtly, border brightens.

- [ ] **Step 4: Test mobile layout**

Resize to < 768px → all cards stack vertically, `--reverse` order resets.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: hobby card carousel — complete implementation"
```
