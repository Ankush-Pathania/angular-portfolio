import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { ScrollAnimationDirective } from '../../core/directives/scroll-animation.directive';

@Component({
    selector: 'app-experience',
    standalone: true,
    imports: [CommonModule, ScrollAnimationDirective],
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
    experience = this.portfolioData.experience;

    constructor(private portfolioData: PortfolioDataService) { }
}
