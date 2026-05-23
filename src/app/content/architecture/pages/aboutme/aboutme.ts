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

  readonly aboutmeStats = computed(() => [
    { label: this.t.getString('aboutme.intro.stats.dj'),    value: this.t.getString('aboutme.intro.stats.djYear')     },
    { label: this.t.getString('aboutme.intro.stats.assos'), value: this.t.getString('aboutme.intro.stats.assosCount') },
    { label: this.t.getString('aboutme.intro.stats.golf'),  value: this.t.getString('aboutme.intro.stats.golfYear')   },
  ]);
}
