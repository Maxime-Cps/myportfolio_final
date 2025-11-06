import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NeatComponent} from '../neat/neat';

@Component({
  selector: 'app-body',
  imports: [
    RouterOutlet,
    NeatComponent,
  ],
  templateUrl: './body.html',
  styleUrl: './body.scss'
})
export class Body {

}
