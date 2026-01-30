import { Component, input } from '@angular/core';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-button-links',
  imports: [TranslatePipe],
  templateUrl: './button-links.html',
  styleUrl: './button-links.scss'
})
export class ButtonLinks {
  showAnimation = input(false);

  openGithub() {
    const url = 'https://github.com/Maxime-Cps';
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  openLinkedin() {
    const url = 'https://www.linkedin.com/in/maxime-chapuis-dev/';
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  openCV() {
    const url = 'assets/docs/cv.pdf';
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
