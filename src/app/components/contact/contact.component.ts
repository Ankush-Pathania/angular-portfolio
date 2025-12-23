import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { ScrollAnimationDirective } from '../../core/directives/scroll-animation.directive';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, FormsModule, ScrollAnimationDirective],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent {
    profile = this.portfolioData.profile;
    socialLinks = this.portfolioData.socialLinks;

    formData = {
        name: '',
        email: '',
        message: ''
    };

    isSubmitting = false;
    submitSuccess = false;

    constructor(private portfolioData: PortfolioDataService) { }

    onSubmit(): void {
        this.isSubmitting = true;

        // Simulate form submission
        setTimeout(() => {
            this.isSubmitting = false;
            this.submitSuccess = true;

            // Reset form
            this.formData = { name: '', email: '', message: '' };

            // Reset success message after 5 seconds
            setTimeout(() => {
                this.submitSuccess = false;
            }, 5000);
        }, 1500);
    }
}
