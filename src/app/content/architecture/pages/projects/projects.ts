import { Component, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  private readonly platformId = inject(PLATFORM_ID);

  selectedProject = signal<IProject | null>(null);
  modalVisible = signal(false);
  /** Touch only: id of the row whose description is currently expanded. */
  expandedId = signal<string | number | null>(null);

  projects: IProject[] = projectsData;

  readonly projectsStats = computed(() => [
    { value: this.t.getString('projects.intro.stats.projectsCount'),     label: this.t.getString('projects.intro.stats.projects')     },
    { value: this.t.getString('projects.intro.stats.technologiesCount'), label: this.t.getString('projects.intro.stats.technologies') },
    { value: this.t.getString('projects.intro.stats.sinceYear'),         label: this.t.getString('projects.intro.stats.since')        },
  ]);

  /** Devices without hover (touch): no hover reveal, so emulate it with a first tap. */
  private isTouch(): boolean {
    return (
      isPlatformBrowser(this.platformId) &&
      window.matchMedia('(hover: none)').matches
    );
  }

  onRowClick(project: IProject): void {
    // First tap on touch: expand the description. Second tap (already expanded): open modal.
    if (this.isTouch() && this.expandedId() !== project.id) {
      this.expandedId.set(project.id);
      return;
    }
    this.openProjectDetail(project);
  }

  openProjectDetail(project: IProject): void {
    this.selectedProject.set(project);
    this.modalVisible.set(true);
  }

  onModalVisibleChange(visible: boolean): void {
    this.modalVisible.set(visible);
    if (!visible) {
      this.selectedProject.set(null);
      this.expandedId.set(null);
    }
  }
}
