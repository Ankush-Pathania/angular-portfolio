import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    // Current theme state
    isDarkMode = signal<boolean>(true);

    constructor() {
        // Check for saved theme preference or default to dark mode
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.isDarkMode.set(savedTheme === 'dark');
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.isDarkMode.set(prefersDark);
        }

        // Apply theme on initialization
        this.applyTheme();
    }

    toggleTheme(): void {
        this.isDarkMode.update(current => !current);
        this.applyTheme();
    }

    private applyTheme(): void {
        const theme = this.isDarkMode() ? 'dark' : 'light';

        // Update document class
        if (this.isDarkMode()) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Update data attribute for CSS variables
        document.documentElement.setAttribute('data-theme', theme);

        // Save preference
        localStorage.setItem('theme', theme);
    }
}
