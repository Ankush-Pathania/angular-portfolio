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
    firstRowSkills: Skill[] = [];
    secondRowSkills: Skill[] = [];

    constructor(private portfolioData: PortfolioDataService) { }

    ngOnInit(): void {
        // Combine all skills from different categories
        this.allSkills = [
            ...this.portfolioData.getFrontendSkills(),
            ...this.portfolioData.getToolsSkills(),
            ...this.portfolioData.getProfessionalSkills()
        ];

        // Split skills into two rows
        const half = Math.ceil(this.allSkills.length / 2);
        this.firstRowSkills = this.allSkills.slice(0, half);
        this.secondRowSkills = this.allSkills.slice(half);
    }
}
