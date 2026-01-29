import { Component } from '@angular/core';
import {CardTools} from '../../../../tools/card-tools/card-tools';
import {TimelineStudies} from '../../../components/timeline-studies/timeline-studies';
import {TabsMenu} from '../../../components/tabs-menu/tabs-menu';
import {SoftSkills} from './soft-skills/soft-skills';
import {Hobbies} from './hobbies/hobbies';

@Component({
  selector: 'app-aboutme',
  imports: [
    TimelineStudies,
    TabsMenu,
    SoftSkills,
    Hobbies
  ],
  templateUrl: './aboutme.html',
  styleUrl: './aboutme.scss'
})
export class Aboutme {

}
