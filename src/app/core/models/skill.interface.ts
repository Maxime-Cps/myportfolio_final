export interface ISkill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'ide';
  icon: string;
}

export interface ICategoryInfo {
  labelKey: string;
  color: string;
}