import { Component } from '@angular/core';
import {ButtonLinks} from '../../../../tools/button-links/button-links';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    ButtonLinks,
    NgOptimizedImage,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
