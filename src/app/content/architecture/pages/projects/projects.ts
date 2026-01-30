import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-projects',
  imports: [
    NgOptimizedImage,
    TranslatePipe
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {

}
