import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [CommonModule, ThemeToggleComponent],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.scss'
})
export class NavComponent {
    isScrolled = false;
    isMobileMenuOpen = false;

    navItems = [
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Experience', href: '#experience' },
        { label: 'Projects', href: '#projects' },
        { label: 'Resume', href: '#resume' },
        { label: 'Contact', href: '#contact' }
    ];

    @HostListener('window:scroll')
    onWindowScroll(): void {
        this.isScrolled = window.scrollY > 50;
    }

    toggleMobileMenu(): void {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }

    closeMobileMenu(): void {
        this.isMobileMenuOpen = false;
    }
}
