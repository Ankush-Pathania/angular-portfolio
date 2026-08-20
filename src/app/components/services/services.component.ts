import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    QueryList,
    ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeInDirective } from '../../core/directives/fade-in.directive';

interface ServiceItem {
    number: string;
    name: string;
    description: string;
}

@Component({
    selector: 'app-services',
    standalone: true,
    imports: [CommonModule, FadeInDirective],
    templateUrl: './services.component.html',
    styleUrl: './services.component.scss'
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
    @ViewChildren('serviceRow') rows!: QueryList<ElementRef<HTMLElement>>;

    services: ServiceItem[] = [
        {
            number: '01',
            name: 'UI/UX Design',
            description:
                'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.'
        },
        {
            number: '02',
            name: 'Frontend Development',
            description:
                'Building responsive interfaces with React, Next.js, Angular, HTML, CSS, and SCSS — focused on performance and polish.'
        },
        {
            number: '03',
            name: 'WordPress & Divi',
            description:
                'Custom WordPress builds with Divi and Elementor, optimized for SiteGround hosting, speed, and easy client editing.'
        },
        {
            number: '04',
            name: 'Motion Design',
            description:
                'Smooth, memorable interactions with Framer Motion and modern animation techniques that elevate digital experiences.'
        },
        {
            number: '05',
            name: 'Branding & UI/UX',
            description:
                'Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.'
        }
    ];

    private observer?: IntersectionObserver;

    ngAfterViewInit(): void {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.rows.forEach((row) => row.nativeElement.classList.add('is-visible'));
            return;
        }

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        this.observer?.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
        );

        this.rows.forEach((row) => this.observer?.observe(row.nativeElement));
    }

    trackByNumber(_: number, item: ServiceItem): string {
        return item.number;
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}
