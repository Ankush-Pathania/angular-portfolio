import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { MarqueeComponent } from './components/marquee/marquee.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { SkillsComponent } from './components/skills/skills.component';
import { SkillsShowcaseComponent } from './components/skills-showcase/skills-showcase.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ContactComponent } from './components/contact/contact.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { SocialLinksComponent } from './components/shared/social-links/social-links.component';
import { SmoothScrollService } from './core/services/smooth-scroll.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        HeroComponent,
        MarqueeComponent,
        AboutComponent,
        ServicesComponent,
        SkillsShowcaseComponent,
        SkillsComponent,
        ExperienceComponent,
        ProjectsComponent,
        ResumeComponent,
        ContactComponent,
        BackToTopComponent,
        SocialLinksComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Ankush -- Web Designer';
    currentYear = new Date().getFullYear();

    constructor(
        private smoothScroll: SmoothScrollService
    ) { }

    ngOnInit(): void {
        void this.smoothScroll.init();
    }

    ngOnDestroy(): void {
        this.smoothScroll.ngOnDestroy();
    }
}
