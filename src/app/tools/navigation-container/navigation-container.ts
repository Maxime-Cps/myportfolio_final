import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { MobileMenuService } from '../../core/services/mobile-menu.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation-container',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navigation-container.html',
  styleUrl: './navigation-container.scss'
})
export class NavigationContainer implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly mobileMenu = inject(MobileMenuService);
  private routerSub?: Subscription;

  menuOpen = this.mobileMenu.menuOpen;

  ngOnInit(): void {
    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.mobileMenu.close());
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  toggleMenu(): void {
    this.mobileMenu.toggle();
  }
}
