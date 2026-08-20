import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    OnDestroy,
    ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { ContactButtonComponent } from '../shared/contact-button/contact-button.component';
import { FadeInDirective } from '../../core/directives/fade-in.directive';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule, ContactButtonComponent, FadeInDirective],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit, OnDestroy {
    @ViewChild('animatedParagraph', { static: true }) paragraphRef!: ElementRef<HTMLElement>;

    profile = this.portfolioData.profile;

    aboutText =
        "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";

    chars: string[] = [];
    charOpacities: number[] = [];

    readonly decor = {
        moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
        object: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
        lego: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
        group: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png'
    };

    private rafId: number | null = null;
    private ticking = false;

    constructor(private portfolioData: PortfolioDataService) {
        this.chars = this.aboutText.split('');
        this.charOpacities = this.chars.map(() => 0.2);
    }

    ngAfterViewInit(): void {
        this.updateCharOpacities();
    }

    @HostListener('window:scroll', [])
    onScroll(): void {
        if (this.ticking) return;
        this.ticking = true;
        this.rafId = requestAnimationFrame(() => {
            this.updateCharOpacities();
            this.ticking = false;
        });
    }

    private updateCharOpacities(): void {
        const el = this.paragraphRef?.nativeElement;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // Approximate Framer offset ['start 0.8', 'end 0.2']
        const start = vh * 0.8;
        const end = vh * 0.2;
        const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height)));

        this.charOpacities = this.chars.map((_, i) => {
            const threshold = i / Math.max(this.chars.length - 1, 1);
            const local = Math.min(1, Math.max(0, (progress - threshold * 0.85) / 0.15));
            return 0.2 + local * 0.8;
        });
    }

    trackByIndex(index: number): number {
        return index;
    }

    ngOnDestroy(): void {
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
        }
    }
}
