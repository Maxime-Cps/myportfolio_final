import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NeatComponent} from '../../components/neat/neat';
import {WelcomeAnimation} from '../../components/welcome-animation/welcome-animation';

@Component({
  selector: 'app-body',
  imports: [
    RouterOutlet,
    NeatComponent,
    WelcomeAnimation,
  ],
  templateUrl: './body.html',
  styleUrl: './body.scss'
})
export class Body {

}
