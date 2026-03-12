export interface IHobbyLink {
  label: string;
  url: string;
  icon: string;
}

export interface IHobbyConfig {
  nameKey: string;
  descriptionKey: string;
  icon: string;
  image?: string;
  links?: IHobbyLink[];
  tags: string[];
}