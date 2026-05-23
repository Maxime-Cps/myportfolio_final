import { Component, computed, inject } from '@angular/core';
import { TimelineStudies } from '../../../components/timeline-studies/timeline-studies';
import { Hobbies } from './hobbies/hobbies';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { PageIntro } from '../../../components/page-intro/page-intro';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-aboutme',
  imports: [
    TimelineStudies,
    Hobbies,
    TranslatePipe,
    PageIntro
  ],
  templateUrl: './aboutme.html',
  styleUrl: './aboutme.scss'
})
export class Aboutme {
  private readonly t = inject(TranslationService);

  private str(key: string): string {
    const v = this.t.get(key);
    return typeof v === 'string' ? v : key;
  }

  readonly aboutmeStats = computed(() => [
    { label: this.str('aboutme.intro.stats.dj'),    value: this.str('aboutme.intro.stats.djYear')     },
    { label: this.str('aboutme.intro.stats.assos'), value: this.str('aboutme.intro.stats.assosCount') },
    { label: this.str('aboutme.intro.stats.golf'),  value: this.str('aboutme.intro.stats.golfYear')   },
  ]);
}
