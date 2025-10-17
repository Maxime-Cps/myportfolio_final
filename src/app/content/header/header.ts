import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NavigationContainer} from '../../tools/navigation-container/navigation-container';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NavigationContainer
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  protected readonly RouterLink = RouterLink;
}
