import { Component } from '@angular/core';
import { TimelineStudies } from '../../../components/timeline-studies/timeline-studies';
import { Hobbies } from './hobbies/hobbies';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-aboutme',
  imports: [
    TimelineStudies,
    Hobbies,
    TranslatePipe
  ],
  templateUrl: './aboutme.html',
  styleUrl: './aboutme.scss'
})
export class Aboutme {

}
