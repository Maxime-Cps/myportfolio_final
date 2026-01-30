import { Component, inject, computed } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { NgOptimizedImage } from '@angular/common';
import { TranslationService } from '../../../../core/services/translation.service';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';

interface Experience {
  titleKey: string;
  company: string;
  location?: string;
  dateKey: string;
  icon: string;
  image?: string;
  descriptionKey?: string;
  tasksKey: string;
  technologies?: string[];
}

@Component({
  selector: 'app-experiences',
  imports: [TimelineModule, CardModule, NgOptimizedImage, TranslatePipe],
  templateUrl: './experiences.html',
  styleUrl: './experiences.scss'
})
export class Experiences {
  private readonly translationService = inject(TranslationService);

  experienceConfigs: Experience[] = [
    {
      titleKey: 'experiences.items.alternance.title',
      company: 'CAPCOD',
      location: 'Strasbourg',
      dateKey: 'experiences.items.alternance.date',
      icon: 'pi pi-code',
      image: 'capcod.jpeg',
      descriptionKey: 'experiences.items.alternance.description',
      tasksKey: 'experiences.items.alternance.tasks',
      technologies: ['Java', 'JSP', 'Angular', 'TypeScript', 'C#', '.NET', 'Git']
    },
    {
      titleKey: 'experiences.items.stage.title',
      company: 'CAPCOD',
      location: 'Strasbourg',
      dateKey: 'experiences.items.stage.date',
      icon: 'pi pi-briefcase',
      image: 'capcod.jpeg',
      descriptionKey: 'experiences.items.stage.description',
      tasksKey: 'experiences.items.stage.tasks',
      technologies: ['Java', 'JSP', 'Jalios', 'Git']
    },
    {
      titleKey: 'experiences.items.rectorat.title',
      company: 'Rectorat de Strasbourg',
      location: 'Strasbourg',
      image: 'ac_strasbourg.svg',
      dateKey: 'experiences.items.rectorat.date',
      icon: 'pi pi-building',
      tasksKey: 'experiences.items.rectorat.tasks'
    },
    {
      titleKey: 'experiences.items.restaurant.title',
      company: 'Restaurant Au Petit Bois Vert',
      location: 'Strasbourg',
      image: 'au_petit_bois_vert.jpg',
      dateKey: 'experiences.items.restaurant.date',
      icon: 'pi pi-star',
      tasksKey: 'experiences.items.restaurant.tasks'
    },
    {
      titleKey: 'experiences.items.intermarche.title',
      company: 'Intermarche',
      location: 'Crepy-en-Valois',
      image: 'intermarche.jpg',
      dateKey: 'experiences.items.intermarche.date',
      icon: 'pi pi-shopping-cart',
      tasksKey: 'experiences.items.intermarche.tasks'
    }
  ];

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
