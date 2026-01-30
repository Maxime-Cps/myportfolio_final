import { Component, inject, computed } from '@angular/core';
import { TranslationService } from '../../../../../core/services/translation.service';

interface SoftSkillConfig {
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

@Component({
  selector: 'app-soft-skills',
  imports: [],
  templateUrl: './soft-skills.html',
  styleUrl: './soft-skills.scss'
})
export class SoftSkills {
  private readonly translationService = inject(TranslationService);

  private skillConfigs: SoftSkillConfig[] = [
    { icon: 'pi pi-users', titleKey: 'softSkills.teamwork.title', descriptionKey: 'softSkills.teamwork.description' },
    { icon: 'pi pi-comments', titleKey: 'softSkills.communication.title', descriptionKey: 'softSkills.communication.description' },
    { icon: 'pi pi-sync', titleKey: 'softSkills.adaptability.title', descriptionKey: 'softSkills.adaptability.description' },
    { icon: 'pi pi-lightbulb', titleKey: 'softSkills.problemSolving.title', descriptionKey: 'softSkills.problemSolving.description' },
    { icon: 'pi pi-search', titleKey: 'softSkills.curiosity.title', descriptionKey: 'softSkills.curiosity.description' },
    { icon: 'pi pi-clock', titleKey: 'softSkills.organization.title', descriptionKey: 'softSkills.organization.description' }
  ];

  softSkills = computed(() => {
    return this.skillConfigs.map(config => {
      const title = this.translationService.get(config.titleKey);
      const description = this.translationService.get(config.descriptionKey);
      return {
        icon: config.icon,
        title: typeof title === 'string' ? title : config.titleKey,
        description: typeof description === 'string' ? description : config.descriptionKey
      };
    });
  });
}
