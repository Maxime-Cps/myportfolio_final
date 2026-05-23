import { Component, ChangeDetectionStrategy, input } from '@angular/core';

export interface PageIntroStat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-page-intro',
  imports: [],
  templateUrl: './page-intro.html',
  styleUrl: './page-intro.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageIntro {
  kicker = input.required<string>();
  lead   = input.required<string>();
  body   = input.required<string>();
  stats  = input<PageIntroStat[]>([]);
}
