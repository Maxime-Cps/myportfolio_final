import { Component } from '@angular/core';
import {ExpPro} from './exp-pro/exp-pro';
import {ExpInfo} from './exp-info/exp-info';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-experiences',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './experiences.html',
  styleUrl: './experiences.scss'
})
export class Experiences {

}
