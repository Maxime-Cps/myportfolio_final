import { Component } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { NgOptimizedImage } from '@angular/common';

interface Experience {
  title: string;
  company: string;
  location?: string;
  date: string;
  icon: string;
  image?: string;
  description?: string;
  tasks: string[];
  technologies?: string[];
}

@Component({
  selector: 'app-experiences',
  imports: [TimelineModule, CardModule, NgOptimizedImage],
  templateUrl: './experiences.html',
  styleUrl: './experiences.scss'
})
export class Experiences {
  experiences: Experience[] = [
    {
      title: 'Alternance Développeur',
      company: 'CAPCOD',
      location: 'Strasbourg',
      date: 'Septembre 2025 - Août 2026',
      icon: 'pi pi-code',
      image: 'capcod.jpeg',
      description: 'Alternance de 3ème année de BUT Informatique',
      tasks: [
        'Développement et maintenance de plateformes Jalios en Java JSP',
        'Développement d\'applications Web avec Angular et TypeScript',
        'Développement d\'API avec C# .NET',
        'Participation aux réunions de planification et de revue de code'
      ],
      technologies: ['Java', 'JSP', 'Angular', 'TypeScript', 'C#', '.NET', 'Git']
    },
    {
      title: 'Stage Développeur Java JSP',
      company: 'CAPCOD',
      location: 'Strasbourg',
      date: 'Avril 2025 - Juin 2025',
      icon: 'pi pi-briefcase',
      image: 'capcod.jpeg',
      description: 'Stage de fin de 2ème année de BUT Informatique',
      tasks: [
        'Développement et maintenance de plateformes Jalios en Java JSP',
        'Collaboration avec l\'équipe pour améliorer les fonctionnalités existantes',
        'Participation aux réunions de planification et de revue de code'
      ],
      technologies: ['Java', 'JSP', 'Jalios', 'Git']
    },
    {
      title: 'Assistant Département Examens et Concours',
      company: 'Rectorat de Strasbourg',
      location: 'Strasbourg',
      image: 'ac_strasbourg.svg',
      date: 'Mai 2023 - Juillet 2023',
      icon: 'pi pi-building',
      tasks: [
        'Préparation des enveloppes sujets',
        'Livraisons des sujets dans les différents lycées et collèges relais d\'Alsace'
      ]
    },
    {
      title: 'Runner / Serveur',
      company: 'Restaurant Au Petit Bois Vert',
      location: 'Strasbourg',
      image: 'au_petit_bois_vert.jpg',
      date: 'Mai 2022 - Septembre 2022',
      icon: 'pi pi-star',
      tasks: [
        'Prise des commandes du client',
        'Apporter les plats et boissons au client',
        'S\'assurer de la propreté des lieux'
      ]
    },
    {
      title: 'Employé Commercial Polyvalent au Drive',
      company: 'Intermarché',
      location: 'Crépy-en-Valois',
      image: 'intermarche.jpg',
      date: 'Juin 2021 - Août 2021',
      icon: 'pi pi-shopping-cart',
      tasks: [
        'Préparation et livraison des commandes',
        'Gestion du stockage des commandes (chaîne du froid...)'
      ]
    }
  ];
}
