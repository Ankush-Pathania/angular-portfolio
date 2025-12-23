import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { ScrollAnimationDirective } from '../../core/directives/scroll-animation.directive';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule, ScrollAnimationDirective],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {
    profile = this.portfolioData.profile;

    constructor(private portfolioData: PortfolioDataService) { }
}
