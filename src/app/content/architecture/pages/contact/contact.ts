import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { environment } from '../../../../../environments/environment';
import { PageIntro } from '../../../components/page-intro/page-intro';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, TranslatePipe, PageIntro],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);

  status = signal<FormStatus>('idle');

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && control.touched);
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.status.set('loading');

    const body = {
      access_key: environment.web3formsKey,
      ...this.contactForm.value
    };

    this.http.post('https://api.web3forms.com/submit', body).subscribe({
      next: () => {
        this.status.set('success');
        this.contactForm.reset();
      },
      error: () => {
        this.status.set('error');
      }
    });
  }
}
