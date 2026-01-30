import { Component } from '@angular/core';
import { TimelineStudies } from '../../../components/timeline-studies/timeline-studies';
import { TabsMenu } from '../../../components/tabs-menu/tabs-menu';
import { SoftSkills } from './soft-skills/soft-skills';
import { Hobbies } from './hobbies/hobbies';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-aboutme',
  imports: [
    TimelineStudies,
    TabsMenu,
    SoftSkills,
    Hobbies,
    TranslatePipe
  ],
  templateUrl: './aboutme.html',
  styleUrl: './aboutme.scss'
})
export class Aboutme {

}
