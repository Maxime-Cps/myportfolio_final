import {ISoftSkillConfig} from '../models/soft-skill.interface';

export const softSkillsData : ISoftSkillConfig[] = [
  { icon: 'pi pi-users', titleKey: 'softSkills.teamwork.title', descriptionKey: 'softSkills.teamwork.description' },
  { icon: 'pi pi-comments', titleKey: 'softSkills.communication.title', descriptionKey: 'softSkills.communication.description' },
  { icon: 'pi pi-sync', titleKey: 'softSkills.adaptability.title', descriptionKey: 'softSkills.adaptability.description' },
  { icon: 'pi pi-lightbulb', titleKey: 'softSkills.problemSolving.title', descriptionKey: 'softSkills.problemSolving.description' },
  { icon: 'pi pi-search', titleKey: 'softSkills.curiosity.title', descriptionKey: 'softSkills.curiosity.description' },
  { icon: 'pi pi-clock', titleKey: 'softSkills.organization.title', descriptionKey: 'softSkills.organization.description' }
];
