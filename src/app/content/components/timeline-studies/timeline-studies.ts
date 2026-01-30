import { Component, inject, computed } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { NgOptimizedImage } from '@angular/common';
import { TranslationService } from '../../../core/services/translation.service';

interface TimelineEvent {
  statusKey: string;
  date: string;
  icon: string;
  color: string;
  image: string;
  descriptionKey?: string;
}

@Component({
  selector: 'app-timeline-studies',
  standalone: true,
  imports: [TimelineModule, CardModule, ButtonModule, NgOptimizedImage, AnimateOnScrollModule],
  templateUrl: './timeline-studies.html',
  styleUrls: ['./timeline-studies.scss']
})
export class TimelineStudies {
  private readonly translationService = inject(TranslationService);

  private eventConfigs: TimelineEvent[] = [
    {
      statusKey: 'timeline.bac.status',
      date: '2020',
      icon: 'pi pi-check-circle',
      color: '#4B9CD3',
      image: 'lyceeJeanMonnet.jpeg',
      descriptionKey: 'timeline.bac.description'
    },
    {
      statusKey: 'timeline.licence.status',
      date: '2020-2023',
      icon: 'pi pi-check-circle',
      color: '#5CB85C',
      image: 'facPhygenie.png'
    },
    {
      statusKey: 'timeline.but.status',
      date: '2023-2026',
      icon: 'pi pi-spin pi-spinner-dotted',
      color: '#F0AD4E',
      image: 'butInfo.png',
      descriptionKey: 'timeline.but.description'
    }
  ];

  events = computed(() => {
    return this.eventConfigs.map(config => {
      const status = this.translationService.get(config.statusKey);
      const description = config.descriptionKey ? this.translationService.get(config.descriptionKey) : undefined;
      return {
        status: typeof status === 'string' ? status : config.statusKey,
        date: config.date,
        icon: config.icon,
        color: config.color,
        image: config.image,
        description: typeof description === 'string' ? description : undefined
      };
    });
  });
}
