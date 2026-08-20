import { Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmoothScrollService } from '../../core/services/smooth-scroll.service';

@Component({
    selector: 'app-back-to-top',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './back-to-top.component.html',
    styleUrls: ['./back-to-top.component.scss']
})
export class BackToTopComponent implements OnDestroy {
    isVisible = false;
    private ticking = false;
    private nearBottom = false;

    constructor(private smoothScroll: SmoothScrollService) { }

    @HostListener('window:scroll')
    onWindowScroll(): void {
        if (this.ticking) return;
        this.ticking = true;
        requestAnimationFrame(() => {
            const y = window.scrollY || window.pageYOffset;
            const docH = document.documentElement.scrollHeight;
            const winH = window.innerHeight;
            this.nearBottom = y + winH >= docH - 80;
            // Show after hero (~1 viewport), hide near very bottom
            this.isVisible = y > winH * 0.85 && !this.nearBottom;
            this.ticking = false;
        });
    }

    scrollToTop(): void {
        this.smoothScroll.scrollTo(0);
    }

    ngOnDestroy(): void { }
}
