import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-contact-button',
    standalone: true,
    imports: [CommonModule],
    template: `
    <a
      [href]="href"
      class="pill-btn inline-flex items-center justify-center px-8 py-3 text-xs sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
    >
      {{ label }}
    </a>
  `
})
export class ContactButtonComponent {
    @Input() label = 'Contact Me';
    @Input() href = '#contact';
}
