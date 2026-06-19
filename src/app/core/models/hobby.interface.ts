export interface IHobbyLink {
  label: string;
  url: string;
  icon: string;
}

export interface IHobbyMedia {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  mode?: 'cover' | 'contain';
  poster?: string;
}

export interface IHobbyConfig {
  nameKey: string;
  descriptionKey: string;
  icon: string;
  media?: IHobbyMedia[];
  links?: IHobbyLink[];
  tags: string[];
}
