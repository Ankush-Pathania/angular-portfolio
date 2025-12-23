import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-back-to-top',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './back-to-top.component.html',
    styleUrls: ['./back-to-top.component.scss']
})
export class BackToTopComponent {
    isVisible = false;

    @HostListener('window:scroll', [])
    onWindowScroll() {
        // Show button when user scrolls down 300px from the top
        this.isVisible = window.pageYOffset > 300;
    }

    scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}
