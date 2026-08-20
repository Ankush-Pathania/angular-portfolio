import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Education } from '../../core/models/portfolio.model';
import { FadeInDirective } from '../../core/directives/fade-in.directive';
import { Tilt3dDirective } from '../../core/directives/tilt-3d.directive';
import { MagnetDirective } from '../../core/directives/magnet.directive';

@Component({
    selector: 'app-resume',
    standalone: true,
    imports: [CommonModule, FadeInDirective, Tilt3dDirective, MagnetDirective],
    templateUrl: './resume.component.html',
    styleUrl: './resume.component.scss'
})
export class ResumeComponent {
    education = this.portfolioData.education;

    readonly brandRibbon: string[] = [];

    readonly decor = {
        moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
        lego: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png'
    };

    constructor(private portfolioData: PortfolioDataService) {
        const names = this.education().map((e) => e.institution.split(',')[0].trim());
        this.brandRibbon = [...names, ...names, ...names];
    }

    typeLabel(edu: Education): string {
        if (edu.type === 'internship') return 'Internship';
        if (edu.type === 'diploma') return 'Diploma';
        return 'Degree';
    }

    initials(edu: Education): string {
        return edu.institution
            .split(/[\s,]+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0]?.toUpperCase() ?? '')
            .join('');
    }

    trackByDegree(_: number, edu: Education): string {
        return edu.degree + edu.institution;
    }
}
