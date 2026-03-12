import { Component, input, output, signal, computed } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonDirective } from 'primeng/button';
import { IProject } from '../../../../../core/models/project.interface';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-project-detail-modal',
  imports: [Dialog, ButtonDirective, TranslatePipe],
  templateUrl: './project-detail-modal.html',
  styleUrl: './project-detail-modal.scss'
})
export class ProjectDetailModal {
  project = input<IProject | null>(null);
  visible = input<boolean>(false);
  visibleChange = output<boolean>();

  selectedImageIndex = signal(0);

  currentImage = computed(() => {
    const proj = this.project();
    if (!proj || proj.images.length === 0) return null;
    return proj.images[this.selectedImageIndex()];
  });

  selectImage(index: number): void {
    this.selectedImageIndex.set(index);
  }

  onHide(): void {
    this.selectedImageIndex.set(0);
    this.visibleChange.emit(false);
  }

  openLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
