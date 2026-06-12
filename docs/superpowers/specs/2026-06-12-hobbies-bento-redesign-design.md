# Redesign de la section Passions — Bento immersif

Date : 2026-06-12
Statut : validé (design), en attente de plan d'implémentation

## Objectif

Refondre l'affichage de la section Passions (`Hobbies`) pour qu'elle soit
plus esthétique et cohérente avec le reste du portfolio (page Projets,
typographie Zalando italic, accent `#eb592f`, détails mono `Space Mono`).
On remplace les cartes alternées + carrousel par une grille **bento** de
cartes média **plein cadre** avec texte en overlay.

## Décisions validées

- **Direction** : garder le paradigme « carte », mais le repolir (pas la liste type Projets).
- **Composition de carte** : média plein cadre, dégradé (scrim) bas, texte par-dessus.
- **Disposition** : bento asymétrique avec une carte vedette.
- **Carte vedette** : Musique Électronique (la plus grande, en haut à gauche).
- **Vidéos** : autoplay muet en boucle **uniquement** là où un `.mp4` propre
  existe déjà. Aucune conversion `.MOV`/ffmpeg pour cette itération.
- **Un seul média par carte** (le carrousel multi-média disparaît).

## Layout

### Desktop (> 768px)

Grille CSS 2 colonnes (`grid-template-columns: 1.25fr 1fr`) :

```
+---------------------+-------------+
| 01 MUSIQUE          | 02 GOLF     |
| (vedette, span 2)   +-------------+
|                     | 03 AUTO     |
+---------------------+-------------+
| 04 ASSOCIATION (pleine largeur)   |
+-----------------------------------+
```

- `01 Musique` : `grid-row: span 2`, colonne 1 (carte la plus haute).
- `02 Golf` : colonne 2, ligne 1.
- `03 Sport Automobile` : colonne 2, ligne 2.
- `04 Engagement Associatif` : `grid-column: 1 / -1` (bannière pleine largeur), ligne 3.

### Mobile (≤ 768px)

Une seule colonne, cartes empilées dans l'ordre 01 → 04. Toutes les cartes
reprennent une hauteur min confortable (≈ 200px), la vedette reste un peu plus haute.

## Anatomie d'une carte

Chaque carte (`.hobby-tile`) est un conteneur `position: relative`,
`border-radius: 14px`, `overflow: hidden`, bordure `1px solid rgba(255,156,127,.22)`.

Couches (du fond vers l'avant) :

1. **Média plein cadre** (`object-fit: cover`, `inset: 0`)
   - `image` : `<img loading="lazy">`
   - `video` : `<video autoplay muted loop playsinline>` + `poster` (image de secours)
   - **Fallback sans média** : dégradé + icône SVG centrée (cas Sport Auto).
2. **Scrim** : `linear-gradient(to top, rgba(8,8,8,.93) 16%, rgba(8,8,8,.25) 58%, transparent)`
   pour garantir la lisibilité du texte. (Adapté pour la carte logo « contain ».)
3. **Index** : `01`–`04` en `Space Mono`, en haut à gauche, avec le petit trait
   accent (réutilise le style `.hobby-card__index` existant).
4. **Body** (overlay bas) : nom (`Zalando Sans Expanded` italic 900), description, tags, liens.

### Visibilité description / tags

- **Carte vedette (Musique)** : nom + description + tags + lien SoundCloud visibles en permanence.
- **Petites cartes (Golf, Auto, Assoc)** : nom + tags visibles ; **description révélée au survol**
  via la technique `grid-template-rows: 0fr → 1fr` (identique à la page Projets, pour la cohérence).

### Survol / interaction

- Survol carte : média `transform: scale(1.04)`, bordure accent
  `rgba(255,156,127,.5)`, légère ombre `0 12px 32px -16px rgba(235,89,47,.35)`.
- Reveal description sur les petites cartes (voir ci-dessus).
- `@media (prefers-reduced-motion: reduce)` : pas de transition ; descriptions
  affichées directement (pas de reveal au survol).

## Mapping des médias

| # | Passion | Média | Type | Notes |
|---|---------|-------|------|-------|
| 01 | Musique Électronique | `assets/img/dj-1.JPG` | image | Photo DJ immersive. Lien SoundCloud conservé. |
| 02 | Golf | `assets/img/golf-3.MP4` | vidéo | autoplay/muted/loop, poster `assets/img/golf-1.jpg`. |
| 03 | Sport Automobile | — | aucun | Fallback icône SVG sur dégradé. |
| 04 | Engagement Associatif | `assets/img/core.png` | image (contain) | Logo centré + dégradé, scrim adapté. |

Notes :
- `golf-4.MP4` dispo en réserve si on préfère ce plan ; on part sur `golf-3.MP4`.
- `messmocky2.PNG` / `dj-1.JPG` : on retient `dj-1.JPG` pour la vedette.
- Les références mortes actuelles sont corrigées : `me-golf.jpg` (supprimé) et
  `messmocky2.png`/`messmocky2.PNG` ne sont plus utilisées.

## Composants touchés

- **`hobbies.ts`** : mettre à jour `hobbyConfigs` (nouveau mapping média, un seul
  média par carte, retrait des refs mortes). Ajout d'un flag/notion de « vedette »
  (ex. la 1ʳᵉ entrée) si nécessaire pour le layout — sinon géré purement en CSS via l'ordre.
- **`hobbies.html`** : nouveau markup bento (`.hobbies-bento` + `.hobby-tile`),
  overlay, index, reveal description. Remplace la `.hobbies-stack` + `app-hobby-carousel`.
- **`hobbies.scss`** : nouvelles règles bento, scrim, overlay, hover, reveal,
  responsive 1 colonne, reduced-motion. Réutilise les tokens du portfolio.
- **`hobby-carousel`** (composant + spec) : **retiré de l'usage** Hobbies.
  Décision d'implémentation : soit suppression du composant s'il n'est utilisé
  nulle part ailleurs, soit on le laisse mais on ne l'importe plus dans Hobbies.
  À vérifier au moment du plan (grep des usages).
- **`hobby.interface.ts`** : `media` reste un tableau `IHobbyMedia[]` ; on n'utilise
  que le 1ᵉʳ élément. `mode: 'cover' | 'contain'` conservé (utile pour le logo CORE).
- **`hobbies.spec.ts`** : adapter aux nouveaux éléments du DOM.

## Accessibilité

- `alt` pertinent sur chaque image.
- Vidéo décorative : `muted`, pas de `controls`, `aria-hidden` possible si purement déco,
  mais on garde un `alt`/label via le nom de la carte affiché.
- Contraste texte garanti par le scrim.
- `prefers-reduced-motion` respecté (pas d'autoplay agressif/zoom ; descriptions visibles).
- Cartes non interactives au clic (pas de modal) ; seuls les liens (SoundCloud) sont focusables.

## Hors périmètre (YAGNI)

- Pas de conversion vidéo `.MOV` → `.mp4` (pas de ffmpeg). Itération ultérieure.
- Pas de média pour Sport Automobile (à fournir plus tard ; icône en attendant).
- Pas de carrousel multi-média.
- Pas de lightbox/modal au clic sur une carte.

## Critères de réussite

- La section Passions affiche les 4 cartes en bento (vedette Musique).
- Golf joue sa vidéo en autoplay muet/boucle ; les autres affichent image/logo/icône.
- Typo, couleurs, index et reveal au survol cohérents avec la page Projets.
- Responsive correct (1 colonne en mobile), reduced-motion respecté.
- Aucune référence d'asset morte ; build + specs OK.
