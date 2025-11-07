import { Component } from '@angular/core';
import {ButtonLinks} from '../../../../tools/button-links/button-links';
import {NgOptimizedImage} from '@angular/common';
import {TabsMenu} from '../../../components/tabs-menu/tabs-menu';


@Component({
  selector: 'app-home',
  imports: [
    ButtonLinks,
    NgOptimizedImage,
    TabsMenu,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
