import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navigation-container',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navigation-container.html',
  styleUrl: './navigation-container.scss'
})
export class NavigationContainer {

}
