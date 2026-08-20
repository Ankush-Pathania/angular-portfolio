import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Project, ProjectGallery } from '../../core/models/portfolio.model';
import { FadeInDirective } from '../../core/directives/fade-in.directive';
import { StickyStackDirective } from '../../core/directives/sticky-stack.directive';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule, FadeInDirective, StickyStackDirective],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
    projects = this.portfolioData.projects;

    constructor(private portfolioData: PortfolioDataService) { }

    pad(index: number): string {
        return String(index + 1).padStart(2, '0');
    }

    resolveGallery(project: Project): ProjectGallery | null {
        if (project.gallery?.leftTop && project.gallery?.leftBottom && project.gallery?.right) {
            return project.gallery;
        }
        const imgs = (project.images ?? []).filter(Boolean);
        if (imgs.length >= 3) {
            return { leftTop: imgs[0], leftBottom: imgs[1], right: imgs[2] };
        }
        if (project.image) {
            return { leftTop: project.image, leftBottom: project.image, right: project.image };
        }
        return null;
    }

    trackByTitle(_: number, project: Project): string {
        return project.title;
    }
}
