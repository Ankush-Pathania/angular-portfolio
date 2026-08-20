import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { ContactButtonComponent } from '../shared/contact-button/contact-button.component';
import { MagnetDirective } from '../../core/directives/magnet.directive';
import { FadeInDirective } from '../../core/directives/fade-in.directive';
import { Tilt3dDirective } from '../../core/directives/tilt-3d.directive';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [
        CommonModule,
        ContactButtonComponent,
        MagnetDirective,
        FadeInDirective,
        Tilt3dDirective
    ],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss'
})
export class HeroComponent {
    profile = this.portfolioData.profile;
    portraitUrl = 'assets/images/portrait.png';

    navItems = [
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Projects', href: '#projects' },
        { label: 'Experience', href: '#experience' },
        { label: 'Contact', href: '#contact' }
    ];

    stats = [
        { value: '5+', label: 'Years Exp.' },
        { value: '50+', label: 'Projects Built' },
        { value: '100%', label: 'Satisfaction' }
    ];

    techStack = ['Next.js', 'Angular', 'React', 'TypeScript', 'Figma'];

    constructor(private portfolioData: PortfolioDataService) {}
}
