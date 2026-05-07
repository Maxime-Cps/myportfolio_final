# Hobby Card Carousel — Design Spec

**Date:** 2026-05-07  
**Status:** Approved

---

## Goal

Replace the single static image in each hobby card with a scrollable carousel supporting multiple images and local videos.

---

## Data Model

Replace `image?: string` and `imageMode?: HobbyImageMode` in `IHobbyConfig` with a `media` array:

```typescript
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

- `HobbyImageMode` type is removed (mode moved to `IHobbyMedia`)
- `IHobbyLink` and all other fields unchanged
- Existing hobby configs migrate: single image → `media: [{ type: 'image', src: '...', mode: 'cover' }]`
- If `media` is absent or empty, fallback to existing SVG icon display

---

## Component Architecture

### New: `HobbyCarousel` standalone component

**Location:** `src/app/content/components/hobby-carousel/`

**Files:**
- `hobby-carousel.ts`
- `hobby-carousel.html`
- `hobby-carousel.scss`

**Inputs:**
```typescript
media     = input<IHobbyMedia[]>([]);
icon      = input<string>('');      // SafeHtml fallback SVG when media is empty
cardIndex = input<number>(0);       // "01", "02" badge value from parent @for $index
```

**Internal state:**
```typescript
currentIndex = signal(0);
```

**Methods:**
- `prev()` — decrement index (clamp at 0)
- `next()` — increment index (clamp at media.length - 1)
- Swipe: `pointerdown` records `startX`, `pointerup` computes delta → if `|delta| > 50px`, call prev/next
- Keyboard: `keydown` on host — ArrowLeft → prev, ArrowRight → next (only when focused)

**Template structure:**
```
.carousel-wrapper
  .carousel-track   ← translateX(-currentIndex * 100%)
    @for item in media
      @if item.type === 'image' → <img>
      @if item.type === 'video' → <video controls>
  .carousel-arrows  ← hidden if media.length <= 1
    button.carousel-arrow--prev  ← calls prev()
    button.carousel-arrow--next  ← calls next()
  .carousel-dots    ← hidden if media.length <= 1
    @for item in media
      span.carousel-dot [class.active]="i === currentIndex()"
  span.hobby-card__index  ← "0n" badge, moved here from parent template
```

### Modified: `Hobbies` component

- Replace `.hobby-card__visual` inner content with `<app-hobby-carousel [media]="hobby.media" [icon]="hobby.icon" [cardIndex]="i" />`
- Remove `hobby-card__visual--contain` class logic (handled inside carousel)
- Remove `hobby-card__icon` fallback markup (handled inside carousel)
- Remove `hobby-card__index` from parent template (moved into carousel)
- Import `HobbyCarousel` in `imports[]`

---

## Visual Design

### Carousel track
- `display: flex`, `overflow: hidden` on `.carousel-wrapper`
- `.carousel-track`: `display: flex`, `transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)`
- Each slide: `flex: 0 0 100%`, `width: 100%`
- `<img>`: `object-fit` from `item.mode` (cover default), `width: 100%`, `height: 100%`
- `<video>`: `object-fit: cover`, `width: 100%`, `height: 100%`

### Arrows
- `position: absolute`, vertically centered on left/right edges
- Size: 36×36px
- Background: `rgba(0, 0, 0, 0.45)`, `backdrop-filter: blur(8px)`
- Border: `1px solid rgba(255, 156, 127, 0.25)`
- Border-radius: 50%
- Hover: `border-color: rgba(255, 156, 127, 0.8)`, `transform: scale(1.1)`
- Icon: `<` / `>` SVG, color `rgba(255, 255, 255, 0.85)`
- Transition: 0.2s ease

### Dots
- `position: absolute`, bottom `0.75rem`, centered horizontally
- Dot: 7×7px circle, `border-radius: 50%`
- Inactive: `rgba(255, 255, 255, 0.35)`
- Active: `#eb592f`, `transform: scale(1.2)`
- Gap: 6px between dots
- Transition: 0.25s ease

### Index badge
- Same styling as current `.hobby-card__index` (Space Mono, top-left, orange line prefix)
- `z-index: 2`, `position: absolute` inside `.carousel-wrapper`

### Fallback (no media)
- Same as current: gradient background + SVG icon centered

---

## Behavior Notes

- No autoplay
- Videos use native `controls` — no custom player
- Swipe threshold: 50px pointer delta
- When carousel has 1 item: arrows and dots hidden, no transition needed
- Index badge always visible regardless of slide count

---

## Files to Create / Modify

| Action | File |
|--------|------|
| Create | `src/app/content/components/hobby-carousel/hobby-carousel.ts` |
| Create | `src/app/content/components/hobby-carousel/hobby-carousel.html` |
| Create | `src/app/content/components/hobby-carousel/hobby-carousel.scss` |
| Modify | `src/app/core/models/hobby.interface.ts` |
| Modify | `src/app/content/architecture/pages/aboutme/hobbies/hobbies.ts` |
| Modify | `src/app/content/architecture/pages/aboutme/hobbies/hobbies.html` |
| Modify | `src/app/content/architecture/pages/aboutme/hobbies/hobbies.scss` |
