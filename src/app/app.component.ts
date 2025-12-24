import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/shared/nav/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { SkillsShowcaseComponent } from './components/skills-showcase/skills-showcase.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ContactComponent } from './components/contact/contact.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { SocialLinksComponent } from './components/shared/social-links/social-links.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        NavComponent,
        HeroComponent,
        SkillsShowcaseComponent,
        AboutComponent,
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
export class AppComponent {
    title = 'Ankush Pathania - Portfolio';
    currentYear = new Date().getFullYear();
}
