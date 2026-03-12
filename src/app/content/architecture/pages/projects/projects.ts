import { Component, signal } from '@angular/core';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { IProject } from '../../../../core/models/project.interface';
import { ProjectDetailModal } from './project-detail-modal/project-detail-modal';
import { projectsData } from '../../../../core/data/projects-data';

@Component({
  selector: 'app-projects',
  imports: [
    TranslatePipe,
    ProjectDetailModal
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  selectedProject = signal<IProject | null>(null);
  modalVisible = signal(false);

  projects: IProject[] = projectsData;

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
