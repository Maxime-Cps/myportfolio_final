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
    { label: this.t.get('aboutme.intro.stats.dj')    as string, value: this.t.get('aboutme.intro.stats.djYear')     as string },
    { label: this.t.get('aboutme.intro.stats.assos') as string, value: this.t.get('aboutme.intro.stats.assosCount') as string },
    { label: this.t.get('aboutme.intro.stats.golf')  as string, value: this.t.get('aboutme.intro.stats.golfYear')   as string },
  ]);
}
