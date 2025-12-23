import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Skill } from '../../core/models/portfolio.model';

@Component({
    selector: 'app-skills-showcase',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './skills-showcase.component.html',
    styleUrl: './skills-showcase.component.scss'
})
export class SkillsShowcaseComponent implements OnInit {
    allSkills: Skill[] = [];

    constructor(private portfolioData: PortfolioDataService) { }

    ngOnInit(): void {
        // Combine all skills from different categories
        this.allSkills = [
            ...this.portfolioData.getFrontendSkills(),
            ...this.portfolioData.getToolsSkills(),
            ...this.portfolioData.getProfessionalSkills()
        ];
    }
}
