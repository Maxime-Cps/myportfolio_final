import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './content/architecture/header/header';
import {Body} from './content/architecture/body/body';
import {Footer} from './content/architecture/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Body, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('myportfolio');
}
