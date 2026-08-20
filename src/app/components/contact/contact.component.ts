import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { FadeInDirective } from '../../core/directives/fade-in.directive';
import { Tilt3dDirective } from '../../core/directives/tilt-3d.directive';
import { MagnetDirective } from '../../core/directives/magnet.directive';
import emailjs from '@emailjs/browser';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, FormsModule, FadeInDirective, Tilt3dDirective, MagnetDirective],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent {
    profile = this.portfolioData.profile;

    formData = {
        name: '',
        email: '',
        message: ''
    };

    nameTouched = false;
    emailTouched = false;
    messageTouched = false;

    isSubmitting = false;
    submitSuccess = false;
    submitError = false;
    errorMessage = '';

    readonly decor = {
        moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
        cube: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
        group: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png'
    };

    private readonly SERVICE_ID = 'service_6prrs1o';
    private readonly TEMPLATE_ID = 'template_ddasan8';
    private readonly PUBLIC_KEY = 'uPiOsw1GEJjYTRHm5';

    constructor(private portfolioData: PortfolioDataService) { }

    isEmailValid(): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email.trim());
    }

    isFormValid(): boolean {
        return this.formData.name.trim().length > 1 &&
            this.isEmailValid() &&
            this.formData.message.trim().length > 5;
    }

    onSubmit(): void {
        this.nameTouched = true;
        this.emailTouched = true;
        this.messageTouched = true;

        if (!this.isFormValid()) {
            this.errorMessage = 'Please fill in all fields correctly.';
            this.submitError = true;
            setTimeout(() => (this.submitError = false), 4000);
            return;
        }

        this.isSubmitting = true;
        this.submitError = false;
        this.submitSuccess = false;

        emailjs
            .send(
                this.SERVICE_ID,
                this.TEMPLATE_ID,
                {
                    from_name: this.formData.name,
                    from_email: this.formData.email,
                    message: this.formData.message,
                    to_name: 'Ankush Pathania'
                },
                this.PUBLIC_KEY
            )
            .then(() => {
                this.isSubmitting = false;
                this.submitSuccess = true;
                this.formData = { name: '', email: '', message: '' };
                this.nameTouched = false;
                this.emailTouched = false;
                this.messageTouched = false;
                setTimeout(() => (this.submitSuccess = false), 4000);
            })
            .catch(() => {
                this.isSubmitting = false;
                this.submitError = true;
                this.errorMessage = 'Failed to send message. Please try again later.';
                setTimeout(() => (this.submitError = false), 5000);
            });
    }
}
