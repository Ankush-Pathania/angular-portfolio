import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { ScrollAnimationDirective } from '../../core/directives/scroll-animation.directive';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule, ScrollAnimationDirective],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
    projects = this.portfolioData.projects;

    constructor(private portfolioData: PortfolioDataService) { }
}
