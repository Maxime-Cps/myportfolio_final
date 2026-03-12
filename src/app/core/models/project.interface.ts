export interface IProjectImage {
  src: string;
  alt: string;
}

export interface IProjectTechnology {
  name: string;
  icon: string;
}

export interface IProject {
  id: string;
  titleKey: string;
  descriptionKey: string;
  longDescriptionKey: string;
  coverImage: IProjectImage;
  images: IProjectImage[];
  technologies: IProjectTechnology[];
  githubUrl?: IUrl[];
  demoUrl?: string;
  gradientColors: [string, string];
}

export interface IUrl {
  label: string;
  url: string;
}
