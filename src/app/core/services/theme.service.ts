import { Injectable, signal } from '@angular/core';

export type ColorTheme = 'blue' | 'green' | 'orange' | 'red' | 'pink' | 'teal' | 'yellow';

export interface ColorPalette {
    name: string;
    primary: string;
    secondary: string;
    tertiary: string;
    displayColor: string;
}

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    // Current theme state
    isDarkMode = signal<boolean>(true);
    currentColorTheme = signal<ColorTheme>('blue');

    // Available color themes with their palettes
    colorThemes: Record<ColorTheme, ColorPalette> = {
        blue: {
            name: 'Blue',
            primary: 'hsl(217, 91%, 60%)',
            secondary: 'hsl(199, 89%, 48%)',
            tertiary: 'hsl(207, 90%, 54%)',
            displayColor: '#4A90E2'
        },
        green: {
            name: 'Green',
            primary: 'hsl(142, 71%, 45%)',
            secondary: 'hsl(160, 84%, 39%)',
            tertiary: 'hsl(151, 55%, 42%)',
            displayColor: '#10B981'
        },
        orange: {
            name: 'Orange',
            primary: 'hsl(25, 95%, 53%)',
            secondary: 'hsl(43, 96%, 56%)',
            tertiary: 'hsl(34, 100%, 50%)',
            displayColor: '#F97316'
        },
        red: {
            name: 'Red',
            primary: 'hsl(0, 84%, 60%)',
            secondary: 'hsl(346, 87%, 57%)',
            tertiary: 'hsl(351, 95%, 71%)',
            displayColor: '#EF4444'
        },
        pink: {
            name: 'Pink',
            primary: 'hsl(328, 85%, 70%)',
            secondary: 'hsl(291, 64%, 65%)',
            tertiary: 'hsl(310, 75%, 68%)',
            displayColor: '#EC4899'
        },
        teal: {
            name: 'Teal',
            primary: 'hsl(173, 80%, 40%)',
            secondary: 'hsl(184, 81%, 44%)',
            tertiary: 'hsl(178, 78%, 42%)',
            displayColor: '#14B8A6'
        },
        yellow: {
            name: 'Yellow',
            primary: 'hsl(48, 96%, 53%)',
            secondary: 'hsl(45, 93%, 47%)',
            tertiary: 'hsl(43, 89%, 38%)',
            displayColor: '#EAB308'
        }
    };

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

        // Check for saved color theme
        const savedColorTheme = localStorage.getItem('colorTheme') as ColorTheme;
        if (savedColorTheme && this.colorThemes[savedColorTheme]) {
            this.currentColorTheme.set(savedColorTheme);
        }

        // Apply theme on initialization
        this.applyTheme();
    }

    toggleTheme(): void {
        this.isDarkMode.update(current => !current);
        this.applyTheme();
    }

    setColorTheme(theme: ColorTheme): void {
        this.currentColorTheme.set(theme);
        this.applyTheme();
        localStorage.setItem('colorTheme', theme);
    }

    private applyTheme(): void {
        const theme = this.isDarkMode() ? 'dark' : 'light';
        const colorTheme = this.currentColorTheme();
        const palette = this.colorThemes[colorTheme];

        // Update document class
        if (this.isDarkMode()) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Update data attribute for CSS variables
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-color-theme', colorTheme);

        // Apply color variables dynamically
        const root = document.documentElement;
        root.style.setProperty('--color-accent-primary', palette.primary);
        root.style.setProperty('--color-accent-secondary', palette.secondary);
        root.style.setProperty('--color-accent-tertiary', palette.tertiary);

        // Update gradient variables
        root.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`);
        root.style.setProperty('--gradient-secondary', `linear-gradient(135deg, ${palette.tertiary}, ${palette.primary})`);
        root.style.setProperty('--gradient-text', `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`);

        // Save preference
        localStorage.setItem('theme', theme);
    }
}
