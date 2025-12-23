import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeService } from '../../core/services/three.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('threeContainer', { static: false }) threeContainer!: ElementRef<HTMLDivElement>;

    profile = this.portfolioData.profile;

    constructor(
        private threeService: ThreeService,
        private portfolioData: PortfolioDataService
    ) { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        // Initialize Three.js scene
        if (this.threeContainer) {
            this.threeService.initScene(this.threeContainer.nativeElement);
            this.threeService.addMouseInteraction();
        }
    }

    ngOnDestroy(): void {
        // Clean up Three.js resources
        this.threeService.dispose();
    }

    scrollToProjects(): void {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    scrollToContact(): void {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
