import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./content/architecture/pages/home/home').then(m => m.Home),
    title: 'Maxime\'s Portfolio'
  },
  {
    path: 'home',
    loadComponent: () => import('./content/architecture/pages/home/home').then(m => m.Home),
    title: 'Maxime\'s Portfolio'
  },
  {
    path: 'home/aboutme',
    loadComponent: () => import('./content/architecture/pages/aboutme/aboutme').then(m => m.Aboutme),
    title: 'About Me'
  },
  {
    path: 'home/projects',
    loadComponent: () => import('./content/architecture/pages/projects/projects').then(m => m.Projects),
    title: 'Projects'
  },
  {
    path: 'home/experiences',
    loadComponent: () => import('./content/architecture/pages/experiences/experiences').then(m => m.Experiences),
    title: 'Experiences'
  },
  {
    path: 'home/contact',
    loadComponent: () => import('./content/architecture/pages/contact/contact').then(m => m.Contact),
    title: 'Contact'
  },
];
