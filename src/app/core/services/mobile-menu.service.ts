import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MobileMenuService {
  menuOpen = signal(false);

  toggle(): void {
    this.menuOpen.set(!this.menuOpen());
  }

  close(): void {
    this.menuOpen.set(false);
  }
}
