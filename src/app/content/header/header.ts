import { Component } from '@angular/core';
import {Navigation} from '../navigation/navigation';

@Component({
  selector: 'app-header',
  imports: [
    Navigation
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
