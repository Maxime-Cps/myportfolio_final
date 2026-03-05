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
    path: 'home/contact',
    component: Contact,
    title: 'Contact - myportfolio'
  },
];
