import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ColorTheme } from '../../../core/services/theme.service';

@Component({
    selector: 'app-theme-toggle',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './theme-toggle.component.html',
    styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {
    isDarkMode = this.themeService.isDarkMode;
    currentColorTheme = this.themeService.currentColorTheme;
    showColorPicker = false;

    availableThemes: { key: ColorTheme; name: string; color: string }[] = [
        { key: 'blue', name: 'Blue', color: '#4A90E2' },
        { key: 'green', name: 'Green', color: '#10B981' },
        { key: 'orange', name: 'Orange', color: '#F97316' },
        { key: 'red', name: 'Red', color: '#EF4444' },
        { key: 'pink', name: 'Pink', color: '#EC4899' },
        { key: 'teal', name: 'Teal', color: '#14B8A6' },
        { key: 'yellow', name: 'Yellow', color: '#EAB308' }
    ];

    constructor(private themeService: ThemeService) { }

    toggleTheme(): void {
        this.themeService.toggleTheme();
    }

    toggleColorPicker(): void {
        this.showColorPicker = !this.showColorPicker;
    }

    selectColorTheme(theme: ColorTheme): void {
        this.themeService.setColorTheme(theme);
        this.showColorPicker = false;
    }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        if (!target.closest('.color-picker-container')) {
            this.showColorPicker = false;
        }
    }
}
