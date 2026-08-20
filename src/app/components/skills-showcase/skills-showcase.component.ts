import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Skill } from '../../core/models/portfolio.model';
import { FadeInDirective } from '../../core/directives/fade-in.directive';
import { AnimateBarDirective } from '../../core/directives/animate-bar.directive';

interface ToolkitColumn {
    id: string;
    index: string;
    label: string;
    intent: string;
    skills: Skill[];
}

@Component({
    selector: 'app-skills-showcase',
    standalone: true,
    imports: [CommonModule, FadeInDirective, AnimateBarDirective],
    templateUrl: './skills-showcase.component.html',
    styleUrl: './skills-showcase.component.scss'
})
export class SkillsShowcaseComponent implements OnInit {
    /** Curated “open every day” tools — order is intentional, not by % */
    readonly dailyDriverNames = [
        'Angular',
        'React',
        'Next.js',
        'SCSS',
        'Figma',
        'WordPress'
    ];

    dailyDrivers: Skill[] = [];
    columns: ToolkitColumn[] = [];

    readonly decor = {
        moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
        lego: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png'
    };

    constructor(private portfolioData: PortfolioDataService) { }

    ngOnInit(): void {
        const all = this.portfolioData.skills();
        const byName = new Map(all.map((s) => [s.name, s]));

        this.dailyDrivers = this.dailyDriverNames
            .map((name) => byName.get(name))
            .filter((s): s is Skill => !!s);

        // Sort each column by mastery so the eye reads strongest → supporting
        const sortByLevel = (list: Skill[]) =>
            [...list].sort((a, b) => b.level - a.level);

        this.columns = [
            {
                id: 'build',
                index: '01',
                label: 'Build',
                intent: 'Interfaces, frameworks, and the code that ships.',
                skills: sortByLevel(this.portfolioData.getFrontendSkills())
            },
            {
                id: 'shape',
                index: '02',
                label: 'Shape',
                intent: 'Design systems, tooling, and the craft around the pixels.',
                skills: sortByLevel(this.portfolioData.getToolsSkills())
            },
            {
                id: 'ship',
                index: '03',
                label: 'Ship',
                intent: 'Quality, collaboration, and what makes work last.',
                skills: sortByLevel(this.portfolioData.getProfessionalSkills())
            }
        ];
    }

    trackByName(_: number, skill: Skill): string {
        return skill.name;
    }

    trackByColumn(_: number, col: ToolkitColumn): string {
        return col.id;
    }
}
