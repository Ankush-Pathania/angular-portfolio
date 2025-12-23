import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { ScrollAnimationDirective } from '../../core/directives/scroll-animation.directive';

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [CommonModule, ScrollAnimationDirective],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.scss'
})
export class SkillsComponent {
    frontendSkills = this.portfolioData.getFrontendSkills();
    toolsSkills = this.portfolioData.getToolsSkills();
    professionalSkills = this.portfolioData.getProfessionalSkills();

    constructor(private portfolioData: PortfolioDataService) { }
}
