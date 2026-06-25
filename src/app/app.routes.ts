import { Routes } from '@angular/router';
import {Home} from './content/architecture/pages/home/home';
import {Aboutme} from './content/architecture/pages/aboutme/aboutme';
import {Projects} from './content/architecture/pages/projects/projects';
import {Experiences} from './content/architecture/pages/experiences/experiences';
import {Contact} from './content/architecture/pages/contact/contact';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Maxime\'s Portfolio'
  },
  {
    path: 'home',
    component: Home,
    title: 'Maxime\'s Portfolio'
  },
  {
    path: 'home/aboutme',
    component: Aboutme,
    title: 'About Me'
  },
  {
    path: 'home/projects',
    component: Projects,
    title: 'Projects'
  },
  {
    path: 'home/experiences',
    component: Experiences,
    title: 'Experiences'
  },
  {
    path: 'home/contact',
    component: Contact,
    title: 'Contact'
  },
];
