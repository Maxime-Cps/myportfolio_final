export interface ISkill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'ide';
  icon: string;
  proficiency?: number; // 0–100
}

export interface ICategoryInfo {
  labelKey: string;
  color: string;
}