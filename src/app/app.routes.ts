import { Routes } from '@angular/router';
import {Home} from './home/home';
import {Aboutme} from './content/pages/aboutme/aboutme';
import {Projects} from './content/pages/projects/projects';
import {Experiences} from './content/pages/experiences/experiences';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'myportfolio'
  },
  {
    path: 'home',
    component: Home,
    title: 'myportfolio'
  },
  {
    path: 'home/aboutme',
    component: Aboutme,
    title: 'About Me - myportfolio'
  },
  {
    path: 'home/projects',
    component: Projects,
    title: 'Projects - myportfolio'
  },
  {
    path: 'home/experiences',
    component: Experiences,
    title: 'Experiences - myportfolio'
  }
];
