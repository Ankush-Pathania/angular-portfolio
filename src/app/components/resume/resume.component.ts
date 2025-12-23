import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { ScrollAnimationDirective } from '../../core/directives/scroll-animation.directive';

@Component({
    selector: 'app-resume',
    standalone: true,
    imports: [CommonModule, ScrollAnimationDirective],
    templateUrl: './resume.component.html',
    styleUrl: './resume.component.scss'
})
export class ResumeComponent {
    education = this.portfolioData.education;

    constructor(private portfolioData: PortfolioDataService) { }

    downloadResume(): void {
        // In a real app, this would download the actual PDF
        window.open('/assets/resume.pdf', '_blank');
    }
}
