# Hobbies Bento Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the alternating-card + carousel Hobbies section with an immersive bento grid of full-bleed media cards (featured = Music), consistent with the Projects page design language.

**Architecture:** Pure presentational refactor of the standalone `Hobbies` Angular component. One media item per card rendered as full-bleed image/video (autoplay-muted-loop) with a gradient scrim and text overlay. CSS Grid bento layout; featured card spans 2 rows, association card spans full width. The `hobby-carousel` component is removed (only consumer was Hobbies). Description reveals on hover for non-featured cards via the `grid-template-rows: 0fr→1fr` technique already used on the Projects page.

**Tech Stack:** Angular v20 standalone components, signals/`computed`, SCSS, Karma+Jasmine (`ng test`), Angular dev server for visual verification.

---

### Task 1: Add optional `poster` to the media interface

**Files:**
- Modify: `src/app/core/models/hobby.interface.ts:7-12`

- [ ] **Step 1: Add `poster` field to `IHobbyMedia`**

```ts
export interface IHobbyMedia {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  mode?: 'cover' | 'contain';
  poster?: string;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/core/models/hobby.interface.ts
git commit -m "feat(hobbies): add optional poster to media interface"
```

---

### Task 2: Update hobby data (new media mapping, featured flag)

**Files:**
- Modify: `src/app/content/architecture/pages/aboutme/hobbies/hobbies.ts`

Rationale: fix dead asset refs (`me-golf.jpg` deleted, `messmocky2.*`), one media item per card, expose a `featured` flag (first card) and a single `media` item to the template.

- [ ] **Step 1: Replace the `media` arrays in `hobbyConfigs`**

In `hobbies.ts`, update each config's `media`:

```ts
// music (index 0) — featured, static photo
media: [{ type: 'image', src: 'assets/img/dj-1.JPG', mode: 'cover', alt: 'Maxime en DJ set' }],
```
```ts
// golf (index 1) — autoplay muted video
media: [{ type: 'video', src: 'assets/img/golf-3.MP4', mode: 'cover', poster: 'assets/img/golf-1.jpg', alt: 'Swing de golf' }],
```
```ts
// motorsport (index 2) — no media, leave media omitted (icon fallback)
// (remove any media key; keep icon + tags)
```
```ts
// association (index 3) — logo, contain
media: [{ type: 'image', src: 'assets/img/core.png', mode: 'contain', alt: 'Logo association CORE' }],
```

- [ ] **Step 2: Expose a single media item + featured flag from the `hobbies` computed**

Replace the `hobbies` computed in `hobbies.ts` with:

```ts
hobbies = computed(() => {
  return this.hobbyConfigs.map((config, index) => {
    const name = this.translationService.get(config.nameKey);
    const description = this.translationService.get(config.descriptionKey);
    return {
      name: typeof name === 'string' ? name : config.nameKey,
      description: typeof description === 'string' ? description : config.descriptionKey,
      icon: config.icon,
      media: config.media?.[0] ?? null,
      links: config.links,
      tags: config.tags,
      featured: index === 0
    };
  });
});
```

- [ ] **Step 3: Build to verify no type errors**

Run: `npm run build`
Expected: build succeeds (warnings about bundle size OK), no TS errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/content/architecture/pages/aboutme/hobbies/hobbies.ts
git commit -m "feat(hobbies): remap media to bento (featured music, golf video), drop dead refs"
```

---

### Task 3: Rewrite the Hobbies template as a bento grid

**Files:**
- Modify (replace contents): `src/app/content/architecture/pages/aboutme/hobbies/hobbies.html`

- [ ] **Step 1: Replace `hobbies.html` with the bento markup**

```html
<div class="hobbies-bento">
  @for (hobby of hobbies(); track hobby.name; let i = $index) {
    <article
      class="hobby-tile"
      [class.hobby-tile--featured]="hobby.featured"
      [class.hobby-tile--logo]="hobby.media?.mode === 'contain'">

      <div class="hobby-tile__media">
        @if (hobby.media) {
          @if (hobby.media.type === 'video') {
            <video
              [poster]="hobby.media.poster ?? ''"
              autoplay muted loop playsinline
              [attr.aria-label]="hobby.media.alt ?? hobby.name">
              <source [src]="hobby.media.src" type="video/mp4" />
            </video>
          } @else {
            <img [src]="hobby.media.src" [alt]="hobby.media.alt ?? hobby.name" loading="lazy" />
          }
        } @else {
          <div class="hobby-tile__icon" [innerHTML]="getSafeIcon(hobby.icon)"></div>
        }
        <div class="hobby-tile__scrim"></div>
      </div>

      <span class="hobby-tile__index">{{ i + 1 < 10 ? '0' + (i + 1) : i + 1 }}</span>

      <div class="hobby-tile__body">
        <h3 class="hobby-tile__name">{{ hobby.name }}</h3>
        <div class="hobby-tile__desc-wrap">
          <p class="hobby-tile__desc">{{ hobby.description }}</p>
        </div>
        <div class="hobby-tile__tags">
          @for (tag of hobby.tags; track tag) {
            <span class="hobby-tag">{{ tag }}</span>
          }
        </div>
        @if (hobby.links) {
          <div class="hobby-tile__links">
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

- [ ] **Step 2: Remove the carousel import from the component**

In `src/app/content/architecture/pages/aboutme/hobbies/hobbies.ts`:
- Delete the import line: `import { HobbyCarousel } from '../../../../../content/components/hobby-carousel/hobby-carousel';`
- Change `imports: [HobbyCarousel],` to `imports: [],`

- [ ] **Step 3: Build to verify**

Run: `npm run build`
Expected: build succeeds, no unused-import or template errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/content/architecture/pages/aboutme/hobbies/hobbies.html src/app/content/architecture/pages/aboutme/hobbies/hobbies.ts
git commit -m "feat(hobbies): bento template with full-bleed media overlay"
```

---

### Task 4: Bento styles (layout, scrim, overlay, hover reveal, responsive)

**Files:**
- Modify (replace contents): `src/app/content/architecture/pages/aboutme/hobbies/hobbies.scss`

- [ ] **Step 1: Replace `hobbies.scss` with the bento styles**

```scss
@use '../../../../../../styles.scss' as *;

.hobbies-bento {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  grid-auto-rows: minmax(150px, auto);
  gap: 1rem;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.hobby-tile {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 156, 127, 0.22);
  border-radius: 14px;
  min-height: 180px;
  background: #0a0a0a;
  transition:
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.3s ease,
    box-shadow 0.4s ease;

  // bento placement (desktop)
  &--featured {
    grid-row: span 2;
    min-height: 340px;
  }

  // association = last card, full-width banner
  &:nth-child(4) {
    grid-column: 1 / -1;
    min-height: 130px;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 156, 127, 0.5);
    box-shadow: 0 12px 32px -16px rgba(235, 89, 47, 0.35);

    .hobby-tile__media img,
    .hobby-tile__media video { transform: scale(1.04); }

    // reveal description on non-featured cards
    &:not(.hobby-tile--featured) .hobby-tile__desc-wrap { grid-template-rows: 1fr; }
  }

  @media (max-width: 768px) {
    grid-column: 1 / -1 !important;
    grid-row: auto !important;
    min-height: 200px;
  }
}

.hobby-tile__media {
  position: absolute;
  inset: 0;

  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
}

// logo card: contain on a tinted gradient instead of cover
.hobby-tile--logo .hobby-tile__media {
  background: linear-gradient(135deg, rgba(58, 37, 22, 0.95), rgba(18, 12, 8, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.75rem;

  img {
    width: auto;
    height: auto;
    max-width: 45%;
    max-height: 70%;
    object-fit: contain;
    opacity: 0.85;
  }
}

.hobby-tile__icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 156, 127, 0.85);
  background: linear-gradient(135deg, rgba(235, 89, 47, 0.18) 0%, rgba(15, 15, 15, 0.9) 100%);

  ::ng-deep svg { width: 72px; height: 72px; }
}

.hobby-tile__scrim {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to top,
    rgba(8, 8, 8, 0.93) 16%,
    rgba(8, 8, 8, 0.25) 58%,
    transparent 100%
  );
}

.hobby-tile__index {
  position: absolute;
  top: 0.9rem;
  left: 1.1rem;
  z-index: 2;
  font-family: 'Space Mono', monospace;
  font-size: 0.74rem;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.85);

  &::before {
    content: '';
    display: inline-block;
    width: 22px;
    height: 1px;
    background: rgba(255, 156, 127, 0.85);
    margin-right: 0.55rem;
    vertical-align: middle;
  }
}

.hobby-tile__body {
  position: absolute;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 1rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hobby-tile__name {
  margin: 0;
  font-family: 'Zalando Sans Expanded', sans-serif;
  font-style: italic;
  font-weight: 900;
  font-size: clamp(1.15rem, 2vw, 1.6rem);
  color: $white-color;
  letter-spacing: -0.015em;
  line-height: 1;
}

.hobby-tile--featured .hobby-tile__name {
  font-size: clamp(1.5rem, 2.6vw, 2.1rem);
}

// description: always open on featured, hover-reveal elsewhere
.hobby-tile__desc-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.hobby-tile--featured .hobby-tile__desc-wrap {
  grid-template-rows: 1fr;
}

.hobby-tile__desc {
  overflow: hidden;
  margin: 0;
  color: rgba(245, 245, 245, 0.8);
  font-size: 0.9rem;
  line-height: 1.5;
}

.hobby-tile__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.hobby-tile__links {
  display: flex;
  gap: 0.85rem;
  margin-top: 0.15rem;
}

.hobby-tag {
  background: transparent;
  border: 1px solid rgba(255, 156, 127, 0.3);
  color: rgba($white-color, 0.82);
  padding: 3px 10px;
  border-radius: 4px;
  font-family: 'Space Mono', monospace;
  font-size: 0.68rem;
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
  ::ng-deep img { width: 26px; height: 26px; }
}

@media (prefers-reduced-motion: reduce) {
  .hobby-tile,
  .hobby-tile__media img,
  .hobby-tile__media video,
  .hobby-tile__desc-wrap {
    transition: none !important;
  }

  // descriptions always visible (no hover dependency)
  .hobby-tile__desc-wrap { grid-template-rows: 1fr !important; }
}
```

- [ ] **Step 2: Build to verify SCSS compiles**

Run: `npm run build`
Expected: build succeeds, no SCSS errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/content/architecture/pages/aboutme/hobbies/hobbies.scss
git commit -m "feat(hobbies): bento layout styles with scrim, hover reveal, responsive"
```

---

### Task 5: Update the Hobbies spec for the new DOM

**Files:**
- Modify: `src/app/content/architecture/pages/aboutme/hobbies/hobbies.spec.ts`

Note: this project uses Karma+Jasmine (`ng test`) which needs a Chrome browser. If Chrome is unavailable in the environment, rely on `npm run build` + the dev-server visual check (Task 6) and still commit the updated spec so it is correct when CI runs it.

- [ ] **Step 1: Replace `hobbies.spec.ts` with DOM-aware tests**

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hobbies } from './hobbies';

describe('Hobbies', () => {
  let component: Hobbies;
  let fixture: ComponentFixture<Hobbies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hobbies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hobbies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders one tile per hobby', () => {
    const tiles = fixture.nativeElement.querySelectorAll('.hobby-tile');
    expect(tiles.length).toBe(component.hobbies().length);
  });

  it('marks the first tile as featured', () => {
    const first = fixture.nativeElement.querySelector('.hobby-tile');
    expect(first.classList).toContain('hobby-tile--featured');
  });

  it('renders an autoplay muted video for the golf card', () => {
    const video: HTMLVideoElement | null = fixture.nativeElement.querySelector('.hobby-tile video');
    expect(video).toBeTruthy();
    expect(video!.muted).toBeTrue();
    expect(video!.autoplay).toBeTrue();
  });

  it('falls back to an icon when a hobby has no media', () => {
    const icon = fixture.nativeElement.querySelector('.hobby-tile__icon');
    expect(icon).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run the spec (if Chrome available)**

Run: `npm test -- --watch=false --browsers=ChromeHeadless`
Expected: Hobbies specs PASS. If Chrome is unavailable, note it and proceed (build is the gate).

- [ ] **Step 3: Commit**

```bash
git add src/app/content/architecture/pages/aboutme/hobbies/hobbies.spec.ts
git commit -m "test(hobbies): assert bento tiles, featured card, golf video, icon fallback"
```

---

### Task 6: Remove the now-unused hobby-carousel component

**Files:**
- Delete: `src/app/content/components/hobby-carousel/hobby-carousel.ts`
- Delete: `src/app/content/components/hobby-carousel/hobby-carousel.html`
- Delete: `src/app/content/components/hobby-carousel/hobby-carousel.scss`
- Delete: `src/app/content/components/hobby-carousel/hobby-carousel.spec.ts`

- [ ] **Step 1: Confirm no remaining references**

Run: `grep -rln -e "hobby-carousel" -e "HobbyCarousel" src/`
Expected: no output (Hobbies no longer imports it after Task 3).

- [ ] **Step 2: Delete the component directory**

Run: `git rm -r src/app/content/components/hobby-carousel`
Expected: 4 files staged for deletion.

- [ ] **Step 3: Build to verify nothing breaks**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore(hobbies): remove unused hobby-carousel component"
```

---

### Task 7: Visual verification on the dev server

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server and open the About/Hobbies section**

Use the preview tooling (`preview_start`), navigate to the route containing the Hobbies section.

- [ ] **Step 2: Verify the bento renders correctly**

Check:
- 4 tiles in bento layout; Music featured (tall, left); Association full-width banner.
- Golf card video autoplays muted and loops.
- Music shows description + SoundCloud link; hovering Golf/Auto reveals their description.
- Motorsport shows the icon fallback.
- No console errors; no broken image/video requests (check network for `dj-1.JPG`, `golf-3.MP4`, `core.png`).

- [ ] **Step 3: Verify responsive (mobile width)**

Resize to ~390px: tiles stack in a single column in order 01→04.

- [ ] **Step 4: Screenshot for the user**

Capture desktop + mobile screenshots and share as proof.

---

## Self-Review

**Spec coverage:**
- Direction A / compo 2 (full-bleed overlay) → Tasks 3–4. ✓
- Bento asymmetric, featured Music → Task 4 layout (`--featured` span 2, `:nth-child(4)` full width). ✓
- Video autoplay only where clean .mp4 → Task 2 (golf-3.MP4) + Task 3 video element. ✓
- Single media per card → Task 2 (`media: config.media?.[0]`). ✓
- Media mapping table (dj-1.JPG / golf-3.MP4+poster / icon / core.png contain) → Task 2. ✓
- Index + Zalando + mono tags + scrim + hover reveal (Projects parity) → Tasks 3–4. ✓
- Description: featured always, others reveal on hover → Task 4 (`--featured` open, `:hover :not(--featured)` reveal). ✓
- Dead refs removed (me-golf.jpg, messmocky2) → Task 2. ✓
- Carousel removed → Tasks 3 (import) + 6 (files). ✓
- Accessibility (alt, muted/no controls, reduced-motion) → Tasks 3–4. ✓
- Responsive single column → Task 4. ✓
- Build + specs OK → Tasks 2–6 build steps, Task 5 specs, Task 7 visual. ✓

**Placeholder scan:** No TBD/TODO; all code blocks complete. ✓

**Type consistency:** `media` exposed as `config.media?.[0] ?? null` (single object) in Task 2; template (Task 3) reads `hobby.media?.type`, `hobby.media.poster`, `hobby.media.mode` — all fields exist on `IHobbyMedia` after Task 1 adds `poster`. `featured` boolean used in both component and template. ✓
