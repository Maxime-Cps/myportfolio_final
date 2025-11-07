import { Component } from '@angular/core';
import {CardTools} from '../../../../tools/card-tools/card-tools';
import {TimelineStudies} from '../../../components/timeline-studies/timeline-studies';

@Component({
  selector: 'app-aboutme',
  imports: [
    CardTools,
    TimelineStudies
  ],
  templateUrl: './aboutme.html',
  styleUrl: './aboutme.scss'
})
export class Aboutme {

}
