import { Routes } from '@angular/router';
import {Home} from './content/pages/home/home';
import {Aboutme} from './content/pages/aboutme/aboutme';
import {Projects} from './content/pages/projects/projects';
import {Experiences} from './content/pages/experiences/experiences';
import {ExpPro} from './content/pages/experiences/exp-pro/exp-pro';
import {ExpInfo} from './content/pages/experiences/exp-info/exp-info';

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
  },
  {
    path: 'home/experiences/exp-pro',
    component: ExpPro,
    title: 'Experiences - Professionnelles'
  },
  {
    path: 'home/experiences/exp-info',
    component: ExpInfo,
    title: 'Experiences - Informatiques'
  },
];
