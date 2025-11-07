import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-experiences',
  imports: [
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './experiences.html',
  styleUrl: './experiences.scss'
})
export class Experiences {

}
