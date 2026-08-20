import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Skill } from '../../core/models/portfolio.model';
import { FadeInDirective } from '../../core/directives/fade-in.directive';
import { AnimateRingDirective } from '../../core/directives/animate-ring.directive';
import { AnimateBarDirective } from '../../core/directives/animate-bar.directive';
import { Tilt3dDirective } from '../../core/directives/tilt-3d.directive';

type SkillTab = 'frontend' | 'tools' | 'professional';

interface SkillCategory {
    id: SkillTab;
    label: string;
    hint: string;
    skills: Skill[];
}

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [
        CommonModule,
        FadeInDirective,
        AnimateRingDirective,
        AnimateBarDirective,
        Tilt3dDirective
    ],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.scss'
})
export class SkillsComponent {
    activeTab: SkillTab = 'frontend';
    readonly circumference = 2 * Math.PI * 54;

    categories: SkillCategory[] = [
        {
            id: 'frontend',
            label: 'Frontend',
            hint: 'Interfaces, frameworks & motion',
            skills: this.portfolioData.getFrontendSkills()
        },
        {
            id: 'tools',
            label: 'Tools',
            hint: 'Design systems, SEO & AI workflow',
            skills: this.portfolioData.getToolsSkills()
        },
        {
            id: 'professional',
            label: 'Craft',
            hint: 'Process, polish & collaboration',
            skills: this.portfolioData.getProfessionalSkills()
        }
    ];

    constructor(private portfolioData: PortfolioDataService) { }

    get activeCategory(): SkillCategory {
        return this.categories.find((c) => c.id === this.activeTab) ?? this.categories[0];
    }

    get featured(): Skill[] {
        return [...this.activeCategory.skills]
            .sort((a, b) => b.level - a.level)
            .slice(0, 3);
    }

    get ledger(): Skill[] {
        return [...this.activeCategory.skills].sort((a, b) => b.level - a.level);
    }

    setTab(tab: SkillTab): void {
        this.activeTab = tab;
    }

    trackByName(_: number, skill: Skill): string {
        return `${this.activeTab}-${skill.name}`;
    }
}
