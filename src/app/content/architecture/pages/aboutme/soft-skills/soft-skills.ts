import { Component } from '@angular/core';

@Component({
  selector: 'app-soft-skills',
  imports: [],
  templateUrl: './soft-skills.html',
  styleUrl: './soft-skills.scss'
})
export class SoftSkills {
  softSkills = [
    { icon: 'pi pi-users', title: 'Travail d\'équipe', description: 'Collaborer efficacement avec différents profils' },
    { icon: 'pi pi-comments', title: 'Communication', description: 'Échanger clairement avec les équipes et clients' },
    { icon: 'pi pi-sync', title: 'Adaptabilité', description: 'M\'ajuster rapidement aux nouvelles situations' },
    { icon: 'pi pi-lightbulb', title: 'Résolution de problèmes', description: 'Analyser et trouver des solutions créatives' },
    { icon: 'pi pi-search', title: 'Curiosité', description: 'Apprendre continuellement de nouvelles technologies' },
    { icon: 'pi pi-clock', title: 'Organisation', description: 'Gérer mon temps et prioriser les tâches' }
  ];
}
