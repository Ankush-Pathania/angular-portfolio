import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeService } from '../../core/services/three.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { ThemeService } from '../../core/services/theme.service';
import { SocialLinksComponent } from '../shared/social-links/social-links.component';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule, SocialLinksComponent],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('threeContainer', { static: false }) threeContainer!: ElementRef<HTMLDivElement>;

    profile = this.portfolioData.profile;
    nameChars: string[] = [];
    threeJsLoaded = false;
    isDarkMode = this.themeService.isDarkMode;

    constructor(
        private threeService: ThreeService,
        private portfolioData: PortfolioDataService,
        private themeService: ThemeService
    ) { }

    ngOnInit(): void {
        // Split name into characters for animation
        this.nameChars = this.profile().name.split('');
    }

    ngAfterViewInit(): void {
        // Defer Three.js initialization to prevent blocking main thread
        // Use requestIdleCallback for better performance
        if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(() => this.initThreeJS(), { timeout: 2000 });
        } else {
            // Fallback for browsers without requestIdleCallback
            setTimeout(() => this.initThreeJS(), 100);
        }
    }

    private initThreeJS(): void {
        if (this.threeContainer && !this.threeJsLoaded) {
            this.threeService.initScene(this.threeContainer.nativeElement);
            this.threeService.addMouseInteraction();
            this.threeJsLoaded = true;

            // Add class to hero for fade-in effect
            const heroElement = this.threeContainer.nativeElement.closest('.hero');
            if (heroElement) {
                heroElement.classList.add('three-loaded');
            }
        }
    }

    ngOnDestroy(): void {
        // Clean up Three.js resources
        this.threeService.dispose();
    }

    // TrackBy function for better ngFor performance
    trackByIndex(index: number): number {
        return index;
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
