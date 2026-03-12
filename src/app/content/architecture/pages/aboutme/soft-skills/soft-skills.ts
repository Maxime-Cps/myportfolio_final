import { Component, inject, computed } from '@angular/core';
import { TranslationService } from '../../../../../core/services/translation.service';
import { ISoftSkillConfig } from '../../../../../core/models/soft-skill.interface';
import {softSkillsData} from '../../../../../core/data/soft-skills-data';

@Component({
  selector: 'app-soft-skills',
  imports: [],
  templateUrl: './soft-skills.html',
  styleUrl: './soft-skills.scss'
})
export class SoftSkills {
  private readonly translationService = inject(TranslationService);

  private skillConfigs: ISoftSkillConfig[] = softSkillsData;

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
