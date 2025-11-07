import { Component } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-timeline-studies',
  standalone: true,
  imports: [TimelineModule, CardModule, ButtonModule, NgOptimizedImage, AnimateOnScrollModule],
  templateUrl: './timeline-studies.html',
  styleUrls: ['./timeline-studies.scss']
})
export class TimelineStudies {
  events: any[];

  constructor() {
    this.events = [
      {
        status: "Baccalauréat Scientifique, Option Sciences de l'Ingénieur, Spécialité ISN",
        date: '2020',
        icon: 'pi pi-book',
        color: '#4B9CD3',
        image: 'lyceeJeanMonnet.jpeg',
        description: "Baccalauréat obtenu en 2020 avec mention Assez Bien. " +
          "Spécialisation en Informatique et Sciences du Numérique. " + "Lycée Jean Monnet."
      },
      {
        status: 'Licence de Physique Ingénierie',
        date: '2020-2023',
        icon: 'pi pi-check-circle',
        color: '#5CB85C',
        image: 'facPhygenie.png',
      },
      {
        status: 'BUT Informatique',
        date: '2023-2026',
        icon: 'pi pi-briefcase',
        color: '#F0AD4E',
        image: 'butInfo.png',
        description: 'Développement Informatique Front et Back-end, Gestion de Projets, Réseaux, DevOps.'
      }
    ];
  }
}
