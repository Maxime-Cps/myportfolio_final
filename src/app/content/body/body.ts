import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Background} from '../background/background';

@Component({
  selector: 'app-body',
  imports: [
    Background
  ],
  templateUrl: './body.html',
  styleUrl: './body.scss'
})
export class Body {

}
