import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { ScrollAnimationDirective } from '../../core/directives/scroll-animation.directive';
import emailjs from '@emailjs/browser';

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
    submitError = false;
    errorMessage = '';

    // EmailJS Configuration
    private readonly SERVICE_ID = 'service_6prrs1o';
    private readonly TEMPLATE_ID = 'template_ddasan8';
    private readonly PUBLIC_KEY = 'uPiOsw1GEJjYTRHm5';

    constructor(private portfolioData: PortfolioDataService) { }

    onSubmit(): void {
        // Validate form data
        if (!this.formData.name || !this.formData.email || !this.formData.message) {
            this.errorMessage = 'Please fill in all fields';
            this.submitError = true;
            setTimeout(() => this.submitError = false, 5000);
            return;
        }

        this.isSubmitting = true;
        this.submitError = false;
        this.submitSuccess = false;

        // Prepare template parameters
        const templateParams = {
            from_name: this.formData.name,
            from_email: this.formData.email,
            message: this.formData.message,
            to_name: 'Recipient Name' // Optional: customize as needed
        };

        // Send email using EmailJS
        emailjs.send(
            this.SERVICE_ID,
            this.TEMPLATE_ID,
            templateParams,
            this.PUBLIC_KEY
        )
            .then(
                (response: { status: number; text: string }) => {
                    console.log('Email sent successfully!', response.status, response.text);
                    this.isSubmitting = false;
                    this.submitSuccess = true;

                    // Reset form
                    this.formData = { name: '', email: '', message: '' };

                    // Reset success message after 5 seconds
                    setTimeout(() => {
                        this.submitSuccess = false;
                    }, 5000);
                },
                (error: { text: string; status: number }) => {
                    console.error('Failed to send email:', error);
                    this.isSubmitting = false;
                    this.submitError = true;
                    this.errorMessage = 'Failed to send message. Please try again later.';

                    // Reset error message after 5 seconds
                    setTimeout(() => {
                        this.submitError = false;
                    }, 5000);
                }
            );
    }
}
