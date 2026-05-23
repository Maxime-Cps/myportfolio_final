import { Component, signal, computed, inject } from '@angular/core';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { IProject } from '../../../../core/models/project.interface';
import { ProjectDetailModal } from './project-detail-modal/project-detail-modal';
import { projectsData } from '../../../../core/data/projects-data';
import { PageIntro } from '../../../components/page-intro/page-intro';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-projects',
  imports: [
    TranslatePipe,
    ProjectDetailModal,
    PageIntro
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  private readonly t = inject(TranslationService);

  selectedProject = signal<IProject | null>(null);
  modalVisible = signal(false);

  projects: IProject[] = projectsData;

  readonly projectsStats = computed(() => [
    { value: this.t.getString('projects.intro.stats.projectsCount'),     label: this.t.getString('projects.intro.stats.projects')     },
    { value: this.t.getString('projects.intro.stats.technologiesCount'), label: this.t.getString('projects.intro.stats.technologies') },
    { value: this.t.getString('projects.intro.stats.sinceYear'),         label: this.t.getString('projects.intro.stats.since')        },
  ]);

  openProjectDetail(project: IProject): void {
    this.selectedProject.set(project);
    this.modalVisible.set(true);
  }

  onModalVisibleChange(visible: boolean): void {
    this.modalVisible.set(visible);
    if (!visible) {
      this.selectedProject.set(null);
    }
  }
}
