import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    QueryList,
    ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Experience } from '../../core/models/portfolio.model';
import { FadeInDirective } from '../../core/directives/fade-in.directive';
import { Tilt3dDirective } from '../../core/directives/tilt-3d.directive';
import { MagnetDirective } from '../../core/directives/magnet.directive';

@Component({
    selector: 'app-experience',
    standalone: true,
    imports: [CommonModule, FadeInDirective, Tilt3dDirective, MagnetDirective],
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
    @ViewChildren('chapter') chapters!: QueryList<ElementRef<HTMLElement>>;

    experience = this.portfolioData.experience;
    activeIndex = 0;

    readonly decor = {
        moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
        cube: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
        lego: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
        group: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png'
    };

    private observer?: IntersectionObserver;

    constructor(private portfolioData: PortfolioDataService) { }

    get totalProgress(): number {
        const n = this.experience().length;
        if (n <= 1) return 100;
        return (this.activeIndex / (n - 1)) * 100;
    }

    dotPosition(i: number): number {
        const n = this.experience().length;
        if (n <= 1) return 0;
        return (i / (n - 1)) * 100;
    }

    ngAfterViewInit(): void {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const el = entry.target as HTMLElement;
                    if (entry.isIntersecting) {
                        el.classList.add('in-view');
                        const idx = Number(el.dataset['index']);
                        if (!Number.isNaN(idx)) this.activeIndex = idx;
                    }
                });
            },
            { threshold: 0.35, rootMargin: '-8% 0px -20% 0px' }
        );

        this.chapters.forEach((c) => this.observer?.observe(c.nativeElement));
    }

    isCurrent(exp: Experience): boolean {
        return /present/i.test(exp.period);
    }

    trackByCompany(_: number, exp: Experience): string {
        return exp.company + exp.period;
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}
