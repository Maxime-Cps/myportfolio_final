import { Component, inject, computed } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { NgOptimizedImage } from '@angular/common';
import { TranslationService } from '../../../../core/services/translation.service';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { IExperience } from '../../../../core/models/experience.interface';
import {experiencesData} from '../../../../core/data/experiences-data';

@Component({
  selector: 'app-experiences',
  imports: [TimelineModule, NgOptimizedImage, TranslatePipe],
  templateUrl: './experiences.html',
  styleUrl: './experiences.scss'
})
export class Experiences {
  private readonly translationService = inject(TranslationService);

  private experienceConfigs: IExperience[] = experiencesData;

  experiences = computed(() => {
    return this.experienceConfigs.map(config => {
      const title = this.translationService.get(config.titleKey);
      const date = this.translationService.get(config.dateKey);
      const description = config.descriptionKey ? this.translationService.get(config.descriptionKey) : undefined;
      return {
        title: typeof title === 'string' ? title : config.titleKey,
        company: config.company,
        location: config.location,
        date: typeof date === 'string' ? date : config.dateKey,
        icon: config.icon,
        image: config.image,
        description: typeof description === 'string' ? description : undefined,
        tasks: this.getTranslatedTasks(config.tasksKey),
        technologies: config.technologies
      };
    });
  });

  private getTranslatedTasks(key: string): string[] {
    const tasks = this.translationService.get(key);
    if (Array.isArray(tasks)) {
      return tasks.filter((t): t is string => typeof t === 'string');
    }
    return typeof tasks === 'string' ? [tasks] : [key];
  }
}
